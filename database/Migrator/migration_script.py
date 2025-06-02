# database/Migrator/migration_script.py
import pyodbc
import sqlite3
import os
from . import config

def migrate_raw_students():
    """
    Lê dados da tabela 'Students' do Access e os insere diretamente
    em uma nova tabela 'Students' no SQLite, sem tratamento.
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
        raw_sqlite_db_path = os.path.join(config.SQLITE_DB_FOLDER, 'students_raw.db')
        if os.path.exists(raw_sqlite_db_path):
            os.remove(raw_sqlite_db_path)
            print(f"Arquivo SQLite existente (raw) removido: {raw_sqlite_db_path}")

        sqlite_conn = sqlite3.connect(raw_sqlite_db_path) # Usar o novo caminho
        sqlite_cursor = sqlite_conn.cursor()
        print(f"Banco de dados SQLite (raw) criado/aberto em: {raw_sqlite_db_path}")

        # 3. Criar a tabela Students no SQLite
        sqlite_cursor.execute("""
            CREATE TABLE IF NOT EXISTS Students (
                StudentID TEXT PRIMARY KEY,
                LastName TEXT NOT NULL,
                FirstName TEXT NOT NULL,
                Age INTEGER NOT NULL,
                Course TEXT NOT NULL,
                Year TEXT NOT NULL
            )
        """)
        sqlite_conn.commit()
        print("Tabela 'Students' (raw) criada no SQLite.")

        # 4. Ler dados do Access e inserir no SQLite
        access_cursor.execute("SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students")
        rows = access_cursor.fetchall()
        print(f"Lendo {len(rows)} registros do Access...")

        inserted_count = 0
        skipped_count = 0

        for i, row in enumerate(rows):
            # Apenas pegue os dados diretamente da linha do Access
            raw_student_id = row.StudentID
            raw_last_name = row.LastName
            raw_first_name = row.FirstName
            raw_age = row.Age
            raw_course = row.Course
            raw_year = row.Year

            try:
                sqlite_cursor.execute("""
                    INSERT INTO Students (StudentID, LastName, FirstName, Age, Course, Year)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (raw_student_id, raw_last_name, raw_first_name,
                      raw_age, raw_course, raw_year))
                inserted_count += 1
            except sqlite3.IntegrityError:
                # Se o StudentID não for garantido como único no Access, você pode ter duplicatas
                print(f"Aviso: StudentID '{raw_student_id}' (linha {i+1}) já existe no SQLite (raw). Pulando este registro.")
                skipped_count += 1
            except Exception as e:
                print(f"Erro ao inserir o registro com StudentID '{raw_student_id}' (linha {i+1}): {e}")
                skipped_count += 1

        sqlite_conn.commit()
        print(f"\nMigração de dados brutos concluída!")
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
            print("Conexão SQLite (raw) fechada.")

if __name__ == "__main__":
    print("--- Iniciando o processo de migração de dados brutos ---")

    # Mantenha a verificação do arquivo Access
    if not os.path.exists(config.ACCESS_DB_PATH):
        print(f"ERRO: Arquivo Access não encontrado em '{config.ACCESS_DB_PATH}'.")
        print("Por favor, crie o arquivo Access ou ajuste o caminho em database/Migrator/config.py.")
    else:
        migrate_raw_students()

    print("\n--- Verificando os primeiros registros no SQLite (raw) após a migração ---")
    try:
        raw_sqlite_db_path = os.path.join(config.SQLITE_DB_FOLDER, 'students_raw.db')
        check_conn_sqlite = sqlite3.connect(raw_sqlite_db_path)
        check_cursor_sqlite = check_conn_sqlite.cursor()
        check_cursor_sqlite.execute("SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students LIMIT 10")
        for row in check_cursor_sqlite.fetchall():
            print(row)
        check_conn_sqlite.close()
    except Exception as e:
        print(f"Erro ao verificar dados no SQLite (raw): {e}")