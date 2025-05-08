import React, { JSX } from 'react';
import { QuestionData } from '../QuestionsData';
import { Question } from '../Question/Question';

interface Props {
    data: QuestionData[];
    renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (
    <ul>
        {data.map((question) => (
            // <li key={question.questionId} >
            //     <Question data={question} />
            // </li>

            <li key={question.questionId} >
                {renderItem ? renderItem(question) : <Question
                    data={question} />}
            </li>
        ))}
    </ul>
);

// Important Note
// map is a standard method that is available in a JavaScript array. The method
// iterates through the items in the array, invoking the function that's passed
// into it for each array item. The function is expected to return an item that will
// form a new array. In summary, it is a way of mapping an array to a new array.
// More information can be found at 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// Important Note
// The key prop helps React detect when the element changes or is added or
// removed. When we output content in a loop, in React, it is good practice to
// apply this prop and set it to a unique value within the loop. This helps React
// distinguish it from the other elements during the rendering process. If we
// don't provide a key prop, React will make unnecessary changes to the DOM
// that can impact performance. More information can be found at https://reactjs.org/docs/lists-and-keys.html

// Important Note
// Destructuring is a special syntax that allows us to unpack objects or arrays
// into variables. More information on destructuring can be found at 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

// Important Note
// Conditions in if statements and ternaries will execute the second
// operand if the condition evaluates to truthy, and the third operand if the
// condition evaluates to falsy. true is only one of many truthy values. In
// fact, false, 0, "", null, undefined, and NaN are falsy values and
// everything else is truthy.