import { QuestionData } from './QuestionsData';
import { Store, createStore, combineReducers } from 'redux';

interface QuestionsState {
    readonly loading: boolean;
    readonly unanswered: QuestionData[];
    readonly viewing: QuestionData | null;
    readonly searched: QuestionData[];
}
export interface AppState {
    readonly questions: QuestionsState;
}

const initialQuestionState: QuestionsState = {
    loading: false,
    unanswered: [],
    viewing: null,
    searched: [],
};


//Implementation of the action types for getting unanswered questions.
//A unique value is required for action type property so that the reducer can determine what changes to make to the store's state.

//how a component interacts with the Redux pieces to get and update a state:
// Components get a state from the store. Components update the state by dispatching an
// action that is fed into a reducer that updates the state. The store passes the new state to the
// component when it is updated.
// Now that we have started to get an understanding of what Redux is, it's time to put this
// into practice in our app.

//A constant to hold the action type - unanswered questions are being fetched
export const GETTINGUNANSWEREDQUESTIONS = 'GettingUnansweredQuestions';
//A function that returns the action GettingUnansweredQuestions
export const gettingUnansweredQuestionsAction = () => (
    {
        type: GETTINGUNANSWEREDQUESTIONS
    } as const);

//A constant to hold the action type - Got Unanswered Questions
export const GOTUNANSWEREDQUESTIONS = 'GotUnansweredQuestions';
//A function that returns the action gotUnansweredQuestionsAction
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) => (
    {
        type: GOTUNANSWEREDQUESTIONS,
        questions: questions,
    } as const);


//Two actions for viewing a question
export const GETTINGQUESTION = 'GettingQuestion';
export const gettingQuestionAction = () => (
    {
        type: GETTINGQUESTION,
    } as const);

export const GOTQUESTION = 'GotQuestion';
export const gotQuestionAction = (question: QuestionData | null) => (
    {
        type: GOTQUESTION,
        question: question,
    } as const);


//Searching questions
export const SEARCHINGQUESTIONS = 'SearchingQuestions';
export const searchingQuestionsAction = () => (
    {
        type: SEARCHINGQUESTIONS,
    } as const);


export const SEARCHEDQUESTIONS = 'SearchedQuestions';
export const searchedQuestionsAction = (questions: QuestionData[]) => (
    {
        type: SEARCHEDQUESTIONS,
        questions,
    } as const);


type QuestionsActions =
    | ReturnType<typeof gettingUnansweredQuestionsAction>
    | ReturnType<typeof gotUnansweredQuestionsAction>
    | ReturnType<typeof gettingQuestionAction>
    | ReturnType<typeof gotQuestionAction>
    | ReturnType<typeof searchingQuestionsAction>
    | ReturnType<typeof searchedQuestionsAction>;


const questionsReducer = (state = initialQuestionState, action: QuestionsActions) => {
    // TODO - Handle the different actions and return new state
    switch (action.type) {
        case GETTINGUNANSWEREDQUESTIONS: {
            return {
                //use the spread syntax to copy the previous state into a new object and then setthe loading state to true.
                ...state,
                loading: true,
            };
        }
        case GOTUNANSWEREDQUESTIONS: {
            return {
                //use the spread syntax to copy the previous state into a new object and set the unanswered and loading properties.
                ...state,
                unanswered: action.questions,
                loading: false,
            };
        }
        case GETTINGQUESTION: {
            return {
                //use the spread syntax to copy the previous state into a new object and then set the viewing and loading state.
                ...state,
                viewing: null,
                loading: true,
            };
        }
        case GOTQUESTION: {
            return {
                //The question being viewed is set to the question from the action and the loading state is reset to false.
                ...state,
                viewing: action.question,
                loading: false,
            };
        }
        case SEARCHINGQUESTIONS: {
            return {
                //The search results are initialized to an empty array and the loading state is set to true while the server request is being made
                ...state,
                searched: [],
                loading: true,
            };
        }
        case SEARCHEDQUESTIONS: {
            return {
                ...state,
                searched: action.questions,
                loading: false,
            };
        }
    }
    return state;
};



//combineReducers is a function we can use to put multiple reducers together into a format required by the createStore function.
// An object literal is passed into combineReducers, which contains the properties
// in our app state, along with the reducer that is responsible for that state. We only
// have a single property in our app state called questions, and a single reducer
// managing changes to that state called questionsReducer.

const rootReducer = combineReducers({
    questions: questionsReducer,
});


// This function uses the createStore function from Redux by passing in the
// combined reducers and undefined as the initial state.
// We use the generic Store type as the return type for the function passing in the
// interface for our app state, which is AppState.
export function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}


// Important note
// A const assertion on an object will give it an immutable type. It also will result
// in string properties having a narrow string literal type rather than the wider
// string type.

// Important note
// When typeof is used for a type, TypeScript will infer the type from the
// variable after the typeof keyword.

// Important note
// The spread syntax allows an object to expand into a place where key-value
// pairs are expected. The syntax consists of three dots followed by the object to
// be expanded. More information can be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax