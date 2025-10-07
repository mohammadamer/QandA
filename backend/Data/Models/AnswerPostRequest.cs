using System.ComponentModel.DataAnnotations;

namespace backend.Data.Models
{
    public class AnswerPostRequest
    {
        [Required]
        public int? QuestionId { get; set; }
        // why does QuestionId need to be able to hold a null value? This is because
        // an int type defaults to 0 and so if there is no QuestionId in the request
        // body, AnswerPostRequest will come out of the model binding process
        // with QuestionId set to 0, which will pass the required validation check. This
        // means the Required attribute won't catch a request body with no QuestionId.

        [Required]
        public string Content { get; set; }
    }

    // Important note
    // The ? allows the property to have a null value as well as the declared
    // type. T? is shortcut syntax for Nullable<T>.
}