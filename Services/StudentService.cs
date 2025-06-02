using StudentProfile.NET.Data;
using StudentProfile.NET.Models;

namespace StudentProfile.NET.Services;

public class StudentService
{
    private readonly MockStudentRepository _repository;

    public StudentService()
    {
        _repository = new MockStudentRepository();
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _repository.GetAllStudents();
    }

    public Student? GetStudentById(int id)
    {
        return _repository.GetStudentById(id);
    }

    public void AddStudent(Student student)
    {
        ValidateStudent(student);
        _repository.AddStudent(student);
    }

    public void UpdateStudent(Student student)
    {
        ValidateStudent(student);
        _repository.UpdateStudent(student);
    }

    public void DeleteStudent(int id)
    {
        _repository.DeleteStudent(id);
    }
    
    private void ValidateStudent(Student student)
    {
        // Validação de campos obrigatórios
        if (string.IsNullOrEmpty(student.FirstName) || 
            string.IsNullOrEmpty(student.LastName) || 
            string.IsNullOrEmpty(student.Course) || 
            string.IsNullOrEmpty(student.Year) || 
            student.Age <= 0)
        {
            throw new ArgumentException("Todos os campos são obrigatórios.");
        }

        if (student.Age < 16 || student.Age > 70)
        {
            throw new ArgumentException("A idade deve estar entre 16 e 70 anos.");
        }
        
        if (student.FirstName.Length > 50)
        {
            throw new ArgumentException("O nome não pode exceder 50 caracteres.");
        }
        
        if (student.LastName.Length > 50)
        {
            throw new ArgumentException("O sobrenome não pode exceder 50 caracteres.");
        }
        
        if (student.Course.Length > 100)
        {
            throw new ArgumentException("O nome do curso não pode exceder 100 caracteres.");
        }
        
        if (!student.Year.EndsWith("º") && !student.Year.EndsWith("°"))
        {
            throw new ArgumentException("O ano deve terminar com º ou °.");
        }
    }
}