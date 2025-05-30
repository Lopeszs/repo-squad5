namespace StudentProfile.NET.Models;

public class Student
{
    public int StudentID { get; set; }
    public required string LastName { get; set; }
    public required string FirstName { get; set; }
    public int Age { get; set; }
    public required string Course { get; set; }
    public required string Year { get; set; }
}