using Microsoft.Data.Sqlite;
using StudentProfile.NET.Models;
using System.Collections.Generic;
using System.Data;

namespace StudentProfile.NET.Data;

public class StudentRepository
{
    private readonly string _connectionString;

    public StudentRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IEnumerable<Student> GetAllStudents()
    {
        var students = new List<Student>();

        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students";

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        try
                        {
                            students.Add(new Student
                            {
                                // Convertendo StudentID de TEXT para int
                                StudentID = int.Parse(reader.GetString(0)),
                                LastName = reader.GetString(1),
                                FirstName = reader.GetString(2),
                                Age = reader.GetInt32(3),
                                Course = reader.GetString(4),
                                Year = reader.GetString(5)
                            });
                        }
                        catch (Exception ex)
                        {
                            // Log do erro e continua para o próximo registro
                            Console.WriteLine($"Erro ao converter registro: {ex.Message}");
                        }
                    }
                }
            }
        }

        return students;
    }

    public Student? GetStudentById(int id)
    {
        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT StudentID, LastName, FirstName, Age, Course, Year FROM Students WHERE StudentID = @id";
                command.Parameters.AddWithValue("@id", id.ToString()); // Convertendo para string

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        try
                        {
                            return new Student
                            {
                                StudentID = int.Parse(reader.GetString(0)),
                                LastName = reader.GetString(1),
                                FirstName = reader.GetString(2),
                                Age = reader.GetInt32(3),
                                Course = reader.GetString(4),
                                Year = reader.GetString(5)
                            };
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Erro ao converter registro: {ex.Message}");
                            return null;
                        }
                    }
                }
            }
        }

        return null;
    }

    public void AddStudent(Student student)
    {
        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();

            // Primeiro, obter o maior ID atual
            int nextId = 1;
            using (var idCommand = connection.CreateCommand())
            {
                idCommand.CommandText = "SELECT MAX(CAST(StudentID as INTEGER)) FROM Students";
                var result = idCommand.ExecuteScalar();
                if (result != null && result != DBNull.Value)
                {
                    nextId = Convert.ToInt32(result) + 1;
                }
            }

            // Usar o próximo ID se o ID fornecido for 0
            if (student.StudentID == 0)
            {
                student.StudentID = nextId;
            }

            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
                    INSERT INTO Students (StudentID, LastName, FirstName, Age, Course, Year)
                    VALUES (@id, @lastName, @firstName, @age, @course, @year)";

                command.Parameters.AddWithValue("@id", student.StudentID.ToString());
                command.Parameters.AddWithValue("@lastName", student.LastName);
                command.Parameters.AddWithValue("@firstName", student.FirstName);
                command.Parameters.AddWithValue("@age", student.Age);
                command.Parameters.AddWithValue("@course", student.Course);
                command.Parameters.AddWithValue("@year", student.Year);

                try
                {
                    command.ExecuteNonQuery();
                }
                catch (SqliteException ex) when (ex.SqliteErrorCode == 19) // SQLITE_CONSTRAINT
                {
                    throw new Exception("Estudante com este ID já existe.");
                }
            }
        }
    }

    public void UpdateStudent(Student student)
    {
        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
                    UPDATE Students 
                    SET LastName = @lastName, 
                        FirstName = @firstName, 
                        Age = @age, 
                        Course = @course, 
                        Year = @year
                    WHERE StudentID = @id";

                command.Parameters.AddWithValue("@id", student.StudentID.ToString()); // Convertendo para string
                command.Parameters.AddWithValue("@lastName", student.LastName);
                command.Parameters.AddWithValue("@firstName", student.FirstName);
                command.Parameters.AddWithValue("@age", student.Age);
                command.Parameters.AddWithValue("@course", student.Course);
                command.Parameters.AddWithValue("@year", student.Year);

                int rowsAffected = command.ExecuteNonQuery();
                if (rowsAffected == 0)
                {
                    throw new Exception("Estudante não encontrado.");
                }
            }
        }
    }

    public void DeleteStudent(int id)
    {
        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "DELETE FROM Students WHERE StudentID = @id";
                command.Parameters.AddWithValue("@id", id.ToString()); // Convertendo para string

                int rowsAffected = command.ExecuteNonQuery();
                if (rowsAffected == 0)
                {
                    throw new Exception("Estudante não encontrado.");
                }
            }
        }
    }
}