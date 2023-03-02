/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from '../Questions/QuestionList';
import { getUnansweredQuestions, QuestionData } from '../QuestionData';
import { PrimaryButton } from '../Styles';

import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);
  React.useEffect(() => {
    console.log('first rendered');
  }, []);

  console.log('rendered');
  const navigate = useNavigate();
  const handleAskQuestionClick = () => {
    console.log('TODO - move to AskQuestionPage');
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading…</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};
