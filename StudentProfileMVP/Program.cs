using StudentProfile.NET.Services;
using StudentProfile.NET.Data;
using StudentProfile.NET.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuração da conexão com o banco de dados
var connectionString = builder.Configuration.GetConnectionString("StudentDatabase");

// Adiciona serviços ao container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<StudentRepository>(sp => new StudentRepository(connectionString));
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

// Configuração CORS para permitir o React e o Swagger
builder.Services.AddCors(options =>
{
    // Política para o React
    options.AddPolicy("ReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });

    // Política para o Swagger e desenvolvimento local
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
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
    
    // Em desenvolvimento, permite qualquer origem localhost
    app.UseCors("AllowLocalhost");
}
else
{
    // Em produção, usa a política restritiva para o React
    app.UseCors("ReactApp");
    
    // Ainda habilita Swagger em produção
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Student Profile API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Adiciona uma rota padrão para redirecionar para o Swagger
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();