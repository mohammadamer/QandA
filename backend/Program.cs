using backend.DataRepository;
using DbUp;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Important
//Adding DataRepository in the ConfigureServices class to make the data repository available for dependency injection.
//This tells ASP.NET that whenever IDataRepository is referenced in a constructor, substitute an instance of the DataRepository class.
//So, if ASP.NET encounters a second constructor that references IDataRepository in the same HTTP request, it will use the instance of the DataRepository class it created previously.
builder.Services.AddScoped<IDataRepository, DataRepository>();


// Important note: 
//The AddScoped method means that only one instance of the DataRepository class is created in a given HTTP request.
//This means that the lifetime of the class that is created lasts for the whole HTTP request.

// Important note
// As well as AddScoped, there are other methods for registering
// dependencies that result in different lifetimes for the generated class. AddTransient will generate a new instance of the class each time it
// is requested. AddSingleton will generate only one class instance for the lifetime of the whole app.

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
