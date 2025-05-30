# database/Migrator/cleaning_rules.py

import re

def clean_student_id(student_id):
    """
    Limpa o StudentID, mantendo apenas números.
    Retorna o StudentID limpo como string ou None se vazio.
    """
    if student_id is None:
        return None
    # Converte para string e remove todos os caracteres não numéricos
    cleaned_id = re.sub(r'[^0-9]', '', str(student_id))
    return cleaned_id if cleaned_id else None

def format_name(name):
    """
    Formata nomes (LastName, FirstName) com inicial maiúscula e resto minúsculo.
    Remove espaços extras e caracteres inválidos.
    Retorna o nome formatado ou None se a entrada for inválida.
    """
    if not isinstance(name, str) or not name.strip():
        return None
    # Remove caracteres inválidos (mantém letras, espaços e alguns caracteres acentuados)
    cleaned_name = re.sub(r'[^a-zA-ZáàâãéèêíóôõúüçÁÀÂÃÉÈÊÍÓÔÕÚÜÇ\s]', '', name).strip()
    # Converte para maiúscula a primeira letra de cada palavra e o resto para minúscula
    return ' '.join(word.capitalize() for word in cleaned_name.split())

def validate_age(age):
    """
    Valida a idade: deve ser um número inteiro entre 15 e 100.
    Retorna a idade como int ou None se inválida.
    """
    if age is None:
        return None
    try:
        # Tenta converter para inteiro
        int_age = int(str(age).strip())
        if 15 <= int_age <= 100:
            return int_age
        else:
            return None # Fora da faixa válida
    except (ValueError, TypeError):
        return None # Não é um número válido

def standardize_course(course, row_index):
    """
    Padroniza o nome do curso.
    - As 4 primeiras linhas têm cursos predefinidos.
    - Aceita todos os outros tipos de curso para as demais linhas.
    - Remove espaços extras e capitaliza a primeira letra de cada palavra para os outros cursos.
    """
    # Regras específicas para as 4 primeiras linhas (baseado no índice 0)
    if row_index == 0:
        return "Ciência da Computação"
    elif row_index == 1:
        return "Engenharia Civil"
    elif row_index == 2:
        return "Medicina"
    elif row_index == 3:
        return "Direito"
    else:
        # Para as demais linhas, aceita o curso como está, mas formata
        if not isinstance(course, str) or not course.strip():
            return None
        # Remove caracteres inválidos e formata como nome próprio
        cleaned_course = re.sub(r'[^a-zA-ZáàâãéèêíóôõúüçÁÀÂÃÉÈÊÍÓÔÕÚÜÇ\s]', '', course).strip()
        return ' '.join(word.capitalize() for word in cleaned_course.split())

def standardize_year(year):
    """
    Padroniza o ano para formato cardinal (1º, 2º, 3º, etc.).
    Retorna a string formatada ou None se inválido.
    """
    if year is None:
        return None

    year_str = str(year).strip().lower()
    
    # Dicionário de mapeamento para números
    year_mapping = {
        '1': '1°', 'primeiro': '1º', 'first': '1º', '1o': '1º',
        '2': '2°', 'segundo': '2º', 'second': '2º', '2o': '2º',
        '3': '3°', 'terceiro': '3º', 'third': '3º', '3o': '3º',
        '4': '4°', 'quarto': '4º', 'fourth': '4º', '4o': '4º',
        '5': '5°', 'quinto': '5º', 'fifth': '5º', '5o': '5º',
        '6': '6°', 'sexto': '6º', 'sixth': '6º', '6o': '6º',
        '7': '7°', 'sétimo': '7º', 'seventh': '7º', '7o': '7º',
        '8': '8°', 'oitavo': '8º', 'eighth': '8º', '8o': '8º',
        '9': '9°', 'nono': '9º', 'ninth': '9º', '9o': '9º',
        '10': '10°', 'décimo': '10º', 'tenth': '10º', '10o': '10º',
    }

    # Tenta converter para inteiro primeiro para capturar '1', '2', '3' etc.
    try:
        int_year = int(year_str)
        if 1 <= int_year <= 10: # Limitando até o 5º ano para este exemplo
            return f"{int_year}°"
    except ValueError:
        pass # Não é um número, tentar mapeamento de string

    # Tenta mapear por string
    for key, value in year_mapping.items():
        if key in year_str: # Usamos 'in' para pegar 'primeiro ano', '2o ano' etc.
            return value
            
    return None # Não correspondeu a nenhum padrão conhecido