import React from 'react';
import { QuestionData } from '../QuestionsData';

interface Props {
    data: QuestionData;
    showContent?: boolean;
}

export const Question = ({ data, showContent = true }: Props) => (
    <div>
        <div>
            {data.title}
        </div>
        {showContent && (
            <div>
                {data.content.length > 50
                    ? `${data.content.substring(0, 50)}...`
                    : data.content}
            </div>)}
        {`Asked by ${data.userName} on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
);

// Question.defaultProps = {
//     showContent: true,
// };

// Important Note
// Dates are often displayed in different formats in different countries. For
// example, February 1, 2021 can be displayed as 02/01/21 or 01/02/21 in different
// countries. toLocaleDateString and toLocaleTimeString
// are methods on the Date object that format the date and time according
// to the browser's locale. More information can be found at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

// Important Note
// A JavaScript ternary is a short way of implementing a conditional
// statement that results in one of two branches of logic being executed. The
// statement contains three operands separated by a question mark (?) and a
// colon (:). The first operand is a condition, the second is what is returned
// if the condition is true, and the third is what is returned if the condition
// is false. The ternary operator is a popular way of implementing conditional
// logic in JSX. More information can be found at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

// Important Note
// JavaScript template literals are strings contained in backticks (`). A template
// literal can include expressions that inject data into the string. Expressions
// are contained in curly brackets after a dollar sign. This is often referred to as
// interpolation. More information can be found at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

// Important Note
// The short-circuit operator (&&) is another way of expressing conditional logic.
// It has two operands, with the first being the condition and the second being the
// logic to execute if the condition evaluates to true. It is often used in JSX to
// conditionally render an element if the condition is true.

// Important Note
// Optional properties are actually a TypeScript feature. Function parameters can
// also be made optional by putting a question mark at the end of the parameter
// name before the type annotation; for example, (duration?:number).