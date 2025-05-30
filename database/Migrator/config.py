# database/Migrator/config.py
import os

# Define o diretório base do script de migração (onde este arquivo está)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Caminho para a pasta onde o banco de dados Access original está localizado
ACCESS_DB_FOLDER = os.path.join(BASE_DIR, '..', 'AccessOriginal')
ACCESS_DB_FILENAME = 'Sample.mdb'
ACCESS_DB_PATH = os.path.join(ACCESS_DB_FOLDER, ACCESS_DB_FILENAME)

# Caminho para o novo arquivo de banco de dados SQLite limpo
SQLITE_DB_FOLDER = os.path.join(BASE_DIR, '..')
SQLITE_DB_FILENAME = 'students_cleaned.db'
SQLITE_DB_PATH = os.path.join(SQLITE_DB_FOLDER, SQLITE_DB_FILENAME)

# String de conexão para o driver ODBC do Access
# Para arquivos .mdb, o driver comum é "Microsoft Access Driver (*.mdb)".
# Mantenha este se você tem o Access Database Engine instalado e ele suporta ambos.
ACCESS_DRIVER = "{Microsoft Access Driver (*.mdb)}" # Geralmente funciona para ambos
# Exemplo de uso em outro arquivo:
# from config import ACCESS_DB_PATH, SQLITE_DB_PATH