using Microsoft.AspNetCore.Mvc;
using StudentProfile.NET.Models;
using StudentProfile.NET.Services;

namespace StudentProfile.NET.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly StudentService _studentService;

    public StudentsController(StudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Student>> GetAll()
    {
        return Ok(_studentService.GetAllStudents());
    }

    [HttpGet("{id}")]
    public ActionResult<Student> GetById(int id)
    {
        var student = _studentService.GetStudentById(id);
        if (student == null)
        {
            return NotFound();
        }
        return Ok(student);
    }

    [HttpGet("{id}/course")]
    public ActionResult<string> GetCourse(int id)
    {
        var student = _studentService.GetStudentById(id);
        if (student == null)
        {
            return NotFound("Estudante não encontrado");
        }
        return Ok(new { course = student.Course });
    }

    [HttpPost]
    public ActionResult Create(Student student)
    {
        try
        {
            _studentService.AddStudent(student);
            return CreatedAtAction(nameof(GetById), new { id = student.StudentID }, student);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return Conflict(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public ActionResult Update(int id, Student student)
    {
        if (id != student.StudentID)
        {
            return BadRequest("ID na URL não corresponde ao ID no corpo da requisição.");
        }

        try
        {
            _studentService.UpdateStudent(student);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        try
        {
            _studentService.DeleteStudent(id);
            return NoContent();
        }
        catch (Exception)
        {
            return NotFound();
        }
    }
}