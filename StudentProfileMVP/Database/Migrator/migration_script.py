# database/Migrator/migration_script.py

import pyodbc
import sqlite3
import os
from . import config
from . import cleaning_rules

def migrate_and_clean_students():
    """
    Lê dados da tabela 'Students' do Access, limpa, padroniza e os insere
    em uma nova tabela 'Students' no SQLite.
    """
    access_conn = None
    sqlite_conn = None
    try:
        # 1. Conectar ao banco de dados Access
        access_conn_str = (
            f"DRIVER={config.ACCESS_DRIVER};"
            f"DBQ={config.ACCESS_DB_PATH};"
        )
        access_conn = pyodbc.connect(access_conn_str)
        access_cursor = access_conn.cursor()
        print(f"Conectado ao banco de dados Access: {config.ACCESS_DB_PATH}")

        # 2. Conectar (ou criar) o banco de dados SQLite
        if os.path.exists(config.SQLITE_DB_PATH):
            os.remove(config.SQLITE_DB_PATH)
            print(f"Arquivo SQLite existente removido: {config.SQLITE_DB_PATH}")

        sqlite_conn = sqlite3.connect(config.SQLITE_DB_PATH)
        sqlite_cursor = sqlite_conn.cursor()
        print(f"Banco de dados SQLite criado/aberto em: {config.SQLITE_DB_PATH}")

        # 3. Criar a tabela Students no SQLite
        sqlite_cursor.execute("""
            CREATE TABLE IF NOT EXISTS Students (
                StudentID TEXT PRIMARY KEY,
                LastName TEXT,
                FirstName TEXT,
                Age INTEGER,
                Course TEXT,
                Year TEXT
            )
        """)
        sqlite_conn.commit()
        print("Tabela 'Students' criada no SQLite.")

        # 4. Ler dados do Access e inserir no SQLite
        access_cursor.execute("SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students")
        rows = access_cursor.fetchall()
        print(f"Lendo {len(rows)} registros do Access...")

        inserted_count = 0
        skipped_count = 0

        for i, row in enumerate(rows):
            original_student_id = row.StudentID
            
            # Aplicar funções de limpeza e padronização
            cleaned_student_id = cleaning_rules.clean_student_id(row.StudentID)
            cleaned_last_name = cleaning_rules.format_name(row.LastName)
            cleaned_first_name = cleaning_rules.format_name(row.FirstName)
            cleaned_age = cleaning_rules.validate_age(row.Age)
            standardized_course = cleaning_rules.standardize_course(row.Course, i)
            standardized_year = cleaning_rules.standardize_year(row.Year)

            if cleaned_student_id is None:
                print(f"Pulando registro com StudentID original '{original_student_id}' (linha {i+1}) devido a ID inválido após limpeza.")
                skipped_count += 1
                continue

            try:
                sqlite_cursor.execute("""
                    INSERT INTO Students (StudentID, LastName, FirstName, Age, Course, Year)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (cleaned_student_id, cleaned_last_name, cleaned_first_name,
                      cleaned_age, standardized_course, standardized_year))
                inserted_count += 1
            except sqlite3.IntegrityError:
                print(f"Aviso: StudentID '{cleaned_student_id}' (linha {i+1}) já existe no SQLite. Pulando este registro.")
                skipped_count += 1
            except Exception as e:
                print(f"Erro ao inserir o registro com StudentID '{original_student_id}' (linha {i+1}, limpo: '{cleaned_student_id}'): {e}")
                skipped_count += 1

        sqlite_conn.commit()
        print(f"\nMigração concluída!")
        print(f"Total de registros processados: {len(rows)}")
        print(f"Registros inseridos com sucesso: {inserted_count}")
        print(f"Registros pulados (erros/duplicatas): {skipped_count}")

    except pyodbc.Error as ex:
        print(f"Erro de conexão ou consulta ao Access: {ex}")
        print("Certifique-se de que o Microsoft Access Driver (*.mdb, *.accdb) esteja instalado.")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")
    finally:
        if access_conn:
            access_conn.close()
            print("Conexão Access fechada.")
        if sqlite_conn:
            sqlite_conn.close()
            print("Conexão SQLite fechada.")

if __name__ == "__main__":
    print("--- Iniciando o processo de migração e limpeza ---")
    
    if not os.path.exists(config.ACCESS_DB_PATH):
        print(f"ERRO: Arquivo Access não encontrado em '{config.ACCESS_DB_PATH}'.")
        print("Por favor, crie o arquivo Access ou ajuste o caminho em database/Migrator/config.py.")
    else:
        migrate_and_clean_students()

    print("\n--- Verificando os primeiros 10 registros no SQLite após a migração ---")
    try:
        check_conn_sqlite = sqlite3.connect(config.SQLITE_DB_PATH)
        check_cursor_sqlite = check_conn_sqlite.cursor()
        check_cursor_sqlite.execute("SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students LIMIT 10")
        for row in check_cursor_sqlite.fetchall():
            print(row)
        check_conn_sqlite.close()
    except Exception as e:
        print(f"Erro ao verificar dados no SQLite: {e}")