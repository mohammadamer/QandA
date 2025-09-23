using DbUp;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// This gets the database connection from the appsettings.json file and creates the database if it doesn't exist.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
EnsureDatabase.For.SqlDatabase(connectionString);

// We've told DbUp where the database is and to look for SQL Scripts that have been embedded in our project. We've also told DbUp to do the database migrations in a transaction.
var upgrader = DeployChanges.To
.SqlDatabase(connectionString, null)
.WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
.WithTransaction()
.Build();

// Get DbUp to do a database migration if there are any pending SQL Scripts
if (upgrader.IsUpgradeRequired())
{
    upgrader.PerformUpgrade();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
