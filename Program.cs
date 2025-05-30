using StudentProfile.NET.Services;
using StudentProfile.NET.Models;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<StudentService>();

// Configuração explícita do Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Student Profile API",
        Version = "v1",
        Description = "API para gerenciamento de perfis de estudantes"
    });
});

// Configuração CORS para permitir acesso de qualquer origem
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configura o pipeline de requisição HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Student Profile API v1");
        c.RoutePrefix = "swagger";
    });
}

// Sempre habilitar Swagger em qualquer ambiente
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Student Profile API v1");
    c.RoutePrefix = "swagger";
});

// Habilita CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Adiciona uma rota padrão para redirecionar para o Swagger
app.MapGet("/", () => Results.Redirect("/swagger"));

// Adiciona uma rota minimal API para obter o curso de um estudante
app.MapGet("/api/students/{id:int}/course/minimal", (int id, StudentService service) =>
{
    var student = service.GetStudentById(id);
    if (student == null)
        return Results.NotFound("Estudante não encontrado");
    
    return Results.Ok(new { course = student.Course });
});

app.Run();