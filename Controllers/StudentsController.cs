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
        try
        {
            return Ok(_studentService.GetAllStudents());
        }
        catch (Exception ex)
        {
            // Retorna detalhes do erro para facilitar a depuração
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Student> GetById(int id)
    {
        try
        {
            var student = _studentService.GetStudentById(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
    }

    [HttpGet("{id}/course")]
    public ActionResult<string> GetCourse(int id)
    {
        try
        {
            var student = _studentService.GetStudentById(id);
            if (student == null)
            {
                return NotFound("Estudante não encontrado");
            }
            return Ok(new { course = student.Course });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
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
            return StatusCode(500, $"Erro interno: {ex.Message}");
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
            return StatusCode(500, $"Erro interno: {ex.Message}");
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
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno: {ex.Message}");
        }
    }
}