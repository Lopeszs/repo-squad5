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
        // Validação básica
        if (string.IsNullOrEmpty(student.FirstName) || 
            string.IsNullOrEmpty(student.LastName) || 
            string.IsNullOrEmpty(student.Course) || 
            string.IsNullOrEmpty(student.Year) || 
            student.Age <= 0)
        {
            throw new ArgumentException("Todos os campos são obrigatórios.");
        }

        _repository.AddStudent(student);
    }

    public void UpdateStudent(Student student)
    {
        // Validação básica
        if (string.IsNullOrEmpty(student.FirstName) || 
            string.IsNullOrEmpty(student.LastName) || 
            string.IsNullOrEmpty(student.Course) || 
            string.IsNullOrEmpty(student.Year) || 
            student.Age <= 0)
        {
            throw new ArgumentException("Todos os campos são obrigatórios.");
        }

        _repository.UpdateStudent(student);
    }

    public void DeleteStudent(int id)
    {
        _repository.DeleteStudent(id);
    }
}