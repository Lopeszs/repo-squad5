# database/Migrator/config.py
import os

# Define o diretório base do script de migração (onde este arquivo está)
# NOTA: Se estiver tendo erro no PowerShell, verifique:
# 1. Se o Python está instalado e adicionado ao PATH do sistema
# 2. Se você está no diretório correto ao executar o script
# 3. Se tem permissões de administrador para acessar os arquivos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Caminho para a pasta onde o banco de dados Access original está localizado
# NOTA: Verifique se a pasta 'AccessOriginal' existe e se o arquivo Sample.mdb está presente
ACCESS_DB_FOLDER = os.path.join(BASE_DIR, '..', 'AccessOriginal')
ACCESS_DB_FILENAME = 'Sample.mdb'
ACCESS_DB_PATH = os.path.join(ACCESS_DB_FOLDER, ACCESS_DB_FILENAME)

# Caminho para o novo arquivo de banco de dados SQLite limpo
# NOTA: Verifique se tem permissões de escrita na pasta pai
SQLITE_DB_FOLDER = os.path.join(BASE_DIR, '..')
SQLITE_DB_FILENAME = 'students_cleaned.db'
SQLITE_DB_PATH = os.path.join(SQLITE_DB_FOLDER, SQLITE_DB_FILENAME)

# String de conexão para o driver ODBC do Access
# NOTA: Verifique se o Microsoft Access Database Engine está instalado
# Para instalar: https://www.microsoft.com/en-us/download/details.aspx?id=54920
# Em sistemas 64-bit, instale a versão 64-bit do driver
ACCESS_DRIVER = "{Microsoft Access Driver (*.mdb, *.accdb)}" # Geralmente funciona para ambos
# Exemplo de uso em outro arquivo:
# from config import ACCESS_DB_PATH, SQLITE_DB_PATH