export interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}

export interface AnswerData {
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

export interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}
export interface AnswerData {
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

const questions: QuestionData[] = [
    {
        questionId: 1,
        title: 'Why should I learn TypeScript?',
        content:
            'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
        userName: 'Bob',
        created: new Date(),
        answers: [
            {
                answerId: 1,
                content: 'To catch problems earlier speeding up your developments',
                userName: 'Jane',
                created: new Date(),
            },
            {
                answerId: 2,
                content:
                    'So, that you can use the JavaScript features of tomorrow, today',
                userName: 'Fred',
                created: new Date(),
            },
        ],
    },
    {
        questionId: 2,
        title: 'Which state management tool should I use?',
        content:
            'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
        userName: 'Bob',
        created: new Date(),
        answers: [],
    },
];

// Important Note
// await stops the next line from
// executing until the asynchronous statement has completed, while async simply
// indicates that the function contains asynchronous statements. So, these keywords
// are very much like async and await in .NET.
// We return Promise<QuestionData[]> rather
// than QuestionData[] because the function doesn't return the questions straight
// away. Instead, it returns the questions eventually.
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
    await wait(500);
    return questions.filter(q => q.answers.length === 0);
};

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Important Note
// An interface is a type that defines the structure for an object, including all its
// properties and methods. Interfaces don't exist in JavaScript, so they are purely
// used by the TypeScript compiler during the type checking process. We create
// an interface with the interface keyword, followed by its name, followed by
// the properties and methods that make up the interface in curly braces. More
// information can be found at https://www.typescriptlang.org/docs/handbook/interfaces.html

// Important Note
// Type annotations lets us declare variables, properties, and function parameters
// with specific types. This allows the TypeScript compiler to check that the code
// adheres to these types. In short, type annotations allow TypeScript to catch
// bugs where our code is using the wrong type much earlier than if we were
// writing our code in JavaScript.

// Important Note
// The Date type is a special type in TypeScript that represents the Date
// JavaScript object. This Date object represents a single moment in time
// and is specified as the number of milliseconds since midnight on January 1,
// 1970, UTC. More information can be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date.

// Important Note
// Square brackets after a type denote an array of the type. More information
// can be found at https://www.typescriptlang.org/docs/handbook/basic-types.html#array.

// Important Note
// The array.filter method in an array executes the function that was
// passed into it for each array item, and then creates a new array with all the
// elements that return truthy from the function. A truthy value is any value other
// than false, 0, "", null, undefined, or NaN. More information can
// be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

// Important Note
// A promise is a JavaScript object that represents the eventual completion
// (or failure) of an asynchronous operation and its resulting value.
// The Promise type in TypeScript is like the Task type in .NET. More
// information can be found at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


// Important Note
// Generic types are a mechanism for allowing the consumer's own type
// to be used in the internal implementation of the generic type. The angle
// brackets allow the consumer type to be passed in as a parameter. Generics in
// TypeScript is very much like generics in .NET. More information can be found
// at https://www.typescriptlang.org/docs/handbook/generics.html

// Important Note
// The void type is another TypeScript-specific type that is used to represent a
// non-returning function. So, void in TypeScript is like void in .NET.