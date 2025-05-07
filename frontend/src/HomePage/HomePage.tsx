import React from 'react';
import { QuestionList } from '../QuestionList/QuestionList';
import { getUnansweredQuestions, QuestionData } from '../QuestionsData';
import { Page } from '../PageTitle/Page';
import { PageTitle } from '../PageTitle/PageTitle';

export const HomePage = () => {
    const [
        questions,
        setQuestions,
    ] = React.useState<QuestionData[]>([]);

    const [
        questionsLoading,
        setQuestionsLoading,
    ] = React.useState(true);

    React.useEffect(() => {
        console.log('first rendered');
        const doGetUnansweredQuestions = async () => {
            const unansweredQuestions = await getUnansweredQuestions();
            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnansweredQuestions();
    }, []);
    
    const handleAskQuestionClick = () => {
        console.log('TODO - move to the AskPage');
    };

    console.log('rendered');
    return (
        <Page>
            <div>
                <PageTitle>Unanswered Questions</PageTitle>
                <button onClick={handleAskQuestionClick}>Ask a question</button>

                {questionsLoading ? (
                    <div>Loading…</div>
                ) : (
                    <QuestionList data={questions || []} />
                )}
                {/* renderItem={(question) => <div> {question.title} </div>} */}
            </div>
        </Page>
    );
}

// Important Note
// The pattern of implementing a function prop to allow consumers to render an
// internal piece of the component is often referred to as a render prop. It makes
// the component extremely flexible and useable in many different scenarios.

// Important Note
// The useEffect hook is a function that allows a side effect, such as fetching
// data, to be performed in a component. The function takes in two parameters,
// with the first parameter being a function to execute. The second parameter
// determines when the function in the first parameter should be executed.
// This is defined in an array of variables that, if changed, results in the first
// parameter function being executed. If the array is empty, then the function is
// only executed once the component has been rendered for the first time. More
// information can be found at https://reactjs.org/docs/hookseffect.html

// Important Note
// The useState function returns an array containing the state variable in
// the first element and a function to set the state in the second element. The
// initial value of the state variable is passed into the function as a parameter. The
// TypeScript type for the state variable can be passed to the function as a generic
// type parameter. More information can be found at https://reactjs.org/docs/hooks-state.html

// Important Note
// The HomePage component is what is called a container component,
// with QuestionList and Question being presentational components.
// Container components are responsible for how things work, fetching any
// data from a web API, and managing state. Presentational components are
// responsible for how things look. Presentational components receive data via
// their props, and also have property event handlers so that their containers can
// manage user interactions.

// Important Note
// Event listeners in JSX can be attached using a function prop that is named
// with on before the native JavaScript event name in camel case. So, a
// native click event can be attached using an onClick function prop. React
// will automatically remove the event listener for us before the element is
// destroyed.