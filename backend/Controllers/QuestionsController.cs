using backend.Data.Models;
using backend.DataRepository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        //We've used the readonly keyword to make sure the variable's reference doesn't change outside the constructor
        //private class-level variable
        private readonly IDataRepository _dataRepository;

        public QuestionsController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IEnumerable<QuestionGetManyResponse> GetQuestions(string search)
        {
            if (string.IsNullOrEmpty(search))
            {
                return _dataRepository.GetQuestions();
            }
            else
            {
                return _dataRepository.GetQuestionsBySearch(search);
            }
        }

        //the HttpGet attribute contains the string "unanswered". 
        // This is an additional path to concatenate to the controller's root path. 
        // So, this action method will handle GET requests to the api/questions/unanswered path.
        //To handle a subpath in an action method, we pass the subpath in the HttpGet attribute parameter.
        [HttpGet("unanswered")]
        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            return _dataRepository.GetUnansweredQuestions();
        }

        //In this method, the questionId parameter will be set to the subpath on the endpoint. So, for the api/questions/3 path, questionId would be set to 3.
        //Endpoint subpath parameters can be implemented by putting the parameter name inside curly brackets inside the HTTP method attribute decorator
        [HttpGet("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> GetQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            return question;
        }

        // Important note
        // The curly brackets tell ASP.NET to put the endpoint subpath in a variable that can be referenced as a method parameter.

        [HttpPost]
        //Note that the method parameter type for questionPostRequest is a classrather than a primitive type.
        public ActionResult<QuestionGetSingleResponse> PostQuestion(QuestionPostRequest questionPostRequest)
        {
            var savedQuestion = _dataRepository.PostQuestion(new
                QuestionPostFullRequest
            {
                Title = questionPostRequest.Title,
                Content = questionPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });
            return CreatedAtAction(nameof(GetQuestion), new { questionId = savedQuestion.QuestionId }, savedQuestion);
        }

        [HttpPut("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }

            //We use ternary expressions to update the request model with data from the existing question if it hasn't been supplied in the request.
            questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title) ? question.Title : questionPutRequest.Title;
            questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content) ? question.Content : questionPutRequest.Content;

            var savedQuestion = _dataRepository.PutQuestion(questionId, questionPutRequest);
            return savedQuestion;
        }


        [HttpDelete("{questionId}")]
        public ActionResult DeleteQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            _dataRepository.DeleteQuestion(questionId);
            return NoContent();
        }

        // An alternative approach would be to put the questionId into the URL (api/
        // question/{questionId}/answer) and not in the body of the request. This
        // could be achieved by changing the decorator and method signature to the following:
        // [HttpPost("{questionId}/answer")]
        // public ActionResult<AnswerGetResponse>
        // PostAnswer(int questionId, AnswerPostRequest
        // answerPostRequest)
        [HttpPost("answer")]
        public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequest answerPostRequest)
        {
            var questionExists = _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
            if (!questionExists)
            {
                return NotFound();
            }
            var savedAnswer = _dataRepository.PostAnswer(new
                AnswerPostFullRequest
            {
                QuestionId = answerPostRequest.QuestionId.Value,
                Content = answerPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });
            return savedAnswer;
        }
        
        // Important note
        // Dependency injection is the process of injecting an instance of a class into
        // another object. The goal of dependency injection is to decouple a class from
        // its dependencies so that the dependencies can be changed without changing
        // the class. ASP.NET has its own dependency injection facility that allows class
        // dependencies to be defined when the app starts up. These dependencies are
        // then available to be injected into other class constructors.

        // Important note
        // Unlike the configuration object that was injected into the data repository,
        // the data repository isn't automatically available for dependency injection. ASP.
        // NET already sets up the configuration object for dependency injection for us
        // because it is responsible for this class. However, DataRepository is our class, so
        // we must register this for dependency injection.

        //Important Recap
        //  To recap, we can use dependency injection to have dependent class instances injected into
        // the constructor of an API controller. Classes that are used in dependency injection need
        // to be registered in the ConfigureServices method in the StartUp class.
        // So, we now have access to our data repository in our API controller with the help of
        // dependency injection. Next, we are going to implement methods that are going to handle
        // specific HTTP requests.

    }
}