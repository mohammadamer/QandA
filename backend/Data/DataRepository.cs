using Microsoft.Data.SqlClient;
using Dapper;
using backend.Data.Models;

namespace backend.DataRepository
{
    public class DataRepository : IDataRepository
    {
        private readonly string _connectionString;
        public DataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public AnswerGetResponse GetAnswer(int answerId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirstOrDefault<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByAnswerId @AnswerId = @AnswerId", new { AnswerId = answerId });
            }
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var question = connection.QueryFirstOrDefault<QuestionGetSingleResponse>(@"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId", new { QuestionId = questionId });
                if (question != null)
                {
                    question.Answers = connection.Query<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = questionId });
                }
                return question;
            }
        }
        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany");
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany_BySearch @Search = @Search", new { Search = search });

                //Why do we have to pass a parameter to Dapper? Why can't we just do the following?
                //return connection.Query<QuestionGetManyResponse>($"EXEC dbo.Question_GetMany_BySearch '{search}'");

                //Well, there are several reasons, but the main one is that the preceding code is vulnerable
                //to a SQL injection attack.So, it's always best to pass parameters into Dapper rather than
                //trying to construct the SQL ourselves.
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>("EXEC dbo.Question_GetUnanswered");
            }
        }
        public bool QuestionExists(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirst<bool>(@"EXEC dbo.Question_Exists @QuestionId = @QuestionId", new { QuestionId = questionId });
            }
        }

        public QuestionGetSingleResponse PostQuestion(QuestionPostRequest question)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                //Important Note:
                //We are using the QueryFirst Dapper method because the stored procedure returns the ID of the new question after inserting it into the database table.
                var questionId = connection.QueryFirst<int>(@"EXEC dbo.Question_Post @Title = @Title, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", question);
                return GetQuestion(questionId);
            }
        }

        public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                //Important Note:
                //using the Dapper Execute method because we are simply executing a stored procedure and not returning anything
                connection.Execute(@"EXEC dbo.Question_Put @QuestionId = @QuestionId, @Title = @Title, @Content = @Content", new { QuestionId = questionId, question.Title, question.Content });
                return GetQuestion(questionId);
            }
        }

        public void DeleteQuestion(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                //Important Note:
                //using the Dapper Execute method because we are simply executing a stored procedure and not returning anything
                connection.Execute(@"EXEC dbo.Question_Delete @QuestionId = @QuestionId", new { QuestionId = questionId });
            }
        }

        public AnswerGetResponse PostAnswer(AnswerPostRequest answer)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirst<AnswerGetResponse>(@"EXEC dbo.Answer_Post @QuestionId = @QuestionId, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", answer);
            }
        }
    }
}

// Important Note
// The readonly keyword prevents the variable from being changed outside of
// the class constructor, which is what we want in this case.

//Important Note
//A using block automatically disposes of the object defined in the block
//when the program exits the scope of the block. This includes whether
//a return statement is invoked within the block, as well as errors occurring within the block.

//Important Note
//Note that the class doesn't need to contain properties for all of the fields that
//are output from the stored procedure. Dapper will ignore fields that don't have
//the corresponding properties in the class.

//Important Note
//Parameter values are passed into a Dapper query using an object where its
//property names match the parameter names. Dapper will then create and
//execute a parameterized query.