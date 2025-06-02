using StudentProfile.NET.Models;

namespace StudentProfile.NET.Data;

public class MockStudentRepository
{
    private readonly List<Student> _students;

    public MockStudentRepository()
    {
        _students = 
        [
            new Student { StudentID = 1, FirstName = "João", LastName = "Silva", Age = 20, Course = "Ciência da Computação", Year = "2º" },
            new Student { StudentID = 2, FirstName = "Maria", LastName = "Santos", Age = 22, Course = "Engenharia", Year = "3º" },
            new Student { StudentID = 3, FirstName = "Pedro", LastName = "Oliveira", Age = 19, Course = "Administração", Year = "1º" },
            new Student { StudentID = 4, FirstName = "Ana", LastName = "Pereira", Age = 21, Course = "Medicina", Year = "2º" },
            new Student { StudentID = 5, FirstName = "Carlos", LastName = "Ferreira", Age = 23, Course = "Direito", Year = "4º" }
        ];
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _students;
    }

    public Student? GetStudentById(int id)
    {
        return _students.FirstOrDefault(s => s.StudentID == id);
    }

    public void AddStudent(Student student)
    {
        if (_students.Any(s => s.StudentID == student.StudentID))
        {
            throw new Exception("Estudante com este ID já existe.");
        }
        _students.Add(student);
    }

    public void UpdateStudent(Student student)
    {
        var existingStudent = _students.FirstOrDefault(s => s.StudentID == student.StudentID);
        if (existingStudent == null)
        {
            throw new Exception("Estudante não encontrado.");
        }

        existingStudent.FirstName = student.FirstName;
        existingStudent.LastName = student.LastName;
        existingStudent.Age = student.Age;
        existingStudent.Course = student.Course;
        existingStudent.Year = student.Year;
    }

    public void DeleteStudent(int id)
    {
        var student = _students.FirstOrDefault(s => s.StudentID == id);
        if (student == null)
        {
            throw new Exception("Estudante não encontrado.");
        }
        _students.Remove(student);
    }
}