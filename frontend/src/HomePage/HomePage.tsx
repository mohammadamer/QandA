import React from 'react';
import { QuestionList } from '../Questions/QuestionList';
import { getUnansweredQuestions } from '../QuestionsData';
import { Page } from '../PageTitle/Page';
import { PageTitle } from '../PageTitle/PageTitle';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PrimaryButton } from '../Styles';
import { useNavigate } from 'react-router-dom';

//connect the home page to the store.
// We will eventually use the useSelector function to get state from the store. The
// useDispatch function will be used to invoke actions.
import { useSelector, useDispatch } from 'react-redux';
import { gettingUnansweredQuestionsAction, gotUnansweredQuestionsAction, AppState } from '../Store';

export const HomePage = () => {

  //The useDispatch hook from React Redux returns a function that we can use to dispatch actions.
  const dispatch = useDispatch();
  // The useSelector hook from React Redux returns state from the store if we pass it a function that selects the state.
  // Use the useSelector hook to get the unanswered questions state from the store
  const questions = useSelector((state: AppState) => state.questions.unanswered);
  //Use the useSelector hook again to get the loading state from the store:
  const questionsLoading = useSelector((state: AppState) => state.questions.loading);

  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {

      //We dispatch the action to the store using the dispatch function.
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();

      //We pass in the unanswered questions to the function that creates this action.
      //We then dispatch the action using the dispatch function.
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
    };

    doGetUnansweredQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const handleAskQuestionClick = () => {
    navigate('ask');
    console.log('TODO - move to the AskPage');
  };

  return (
    <Page>
      <div css={css` display: flex; align-items: center; justify-content: space-between; `}>
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ?
        (<div>Loading...</div>) : (<QuestionList data={questions} />)
      }
    </Page>
  );
};

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