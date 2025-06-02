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
    Remove caracteres não alfabéticos e espaços extras, mantendo um único espaço entre palavras.
    Retorna o nome formatado ou None se a entrada for inválida.
    """
    if not isinstance(name, str) or not name.strip():
        return None
    # Remove caracteres inválidos (mantém letras, espaços e caracteres acentuados)
    cleaned_name = re.sub(r'[^a-zA-ZáàâãéèêíóôõúüçÁÀÂÃÉÈÊÍÓÔÕÚÜÇ\s]', '', name).strip()
    # Substitui múltiplos espaços por um único espaço e capitaliza cada palavra
    return ' '.join(word.capitalize() for word in cleaned_name.split())

def validate_age(age):
    """
    Valida a idade: deve ser um número inteiro entre 15 e 99.
    Retorna a idade como int ou None se inválida ou fora da faixa.
    """
    if age is None:
        return None
    try:
        int_age = int(str(age).strip())
        if 15 <= int_age <= 99:
            return int_age
        else:
            return None # Fora da faixa válida
    except (ValueError, TypeError):
        return None # Não é um número válido

def standardize_course(course, row_index):
    """
    Padroniza o nome do curso.
    - As 4 primeiras linhas têm cursos predefinidos na ordem solicitada.
    - Para as demais linhas, formata a primeira letra de cada palavra em maiúscula.
    """
    # Regras específicas para as 4 primeiras linhas (baseado no índice 0)
    if row_index == 0:
        return "Ciência da Computação"
    elif row_index == 1:
        return "Medicina"
    elif row_index == 2:
        return "Direito"
    elif row_index == 3:
        return "Engenharia Civil"
    else:
        # Para as demais linhas, formata o curso
        if not isinstance(course, str) or not course.strip():
            return None
        # Remove caracteres não alfanuméricos (exceto espaços) e formata como nome próprio
        cleaned_course = re.sub(r'[^a-zA-ZáàâãéèêíóôõúüçÁÀÂÃÉÈÊÍÓÔÕÚÜÇ\s]', '', course).strip()
        return ' '.join(word.capitalize() for word in cleaned_course.split())

def standardize_year(year):
    """
    Padroniza o ano para formato ordinal (1°, 2°, 3°, etc.).
    Pega os numéricos, remove caracteres após e adiciona "°".
    Retorna a string formatada ou None se inválido.
    """
    if year is None:
        return None

    year_str = str(year).strip()

    # Tenta extrair apenas o primeiro grupo de dígitos numéricos
    match = re.match(r'^\D*(\d+).*', year_str)
    if match:
        try:
            numeric_year = int(match.group(1))
            if 1 <= numeric_year <= 15:
                return f"{numeric_year}°"
            else:
                return None # Número fora da faixa
        except ValueError:
            pass # Não foi possível converter para inteiro
    
    return None # Não foi possível extrair um número ou não correspondeu aos critérios