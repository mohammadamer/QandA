import React from 'react';
import { Page } from '../PageTitle/Page';
import { useParams } from 'react-router-dom';
import { QuestionData, getQuestion } from '../QuestionsData';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray3, gray6 } from '../Styles';
import { AnswerList } from '../Answers/AnswerList';

export const QuestionPage = () => {
    const [question, setQuestion] = React.useState<QuestionData | null>(null);
    const { questionId } = useParams();

    React.useEffect(() => {
        const doGetQuestion = async (
            questionId: number) => {
            const foundQuestion = await getQuestion(questionId);
            setQuestion(foundQuestion);
        };
        if (questionId) {
            doGetQuestion(Number(questionId));
        }
    }, [questionId]);

    return (
        <Page>
            <div css={css` background-color: white; padding: 15px 20px 20px 20px; border-radius: 4px; border: 1px solid ${gray6}; box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);`}>
                <div css={css` font-size: 19px; font-weight: bold; margin: 10px 0px 5px;`}>
                    {question === null ? '' : question.title}
                </div>
                {question !== null && (
                    <React.Fragment>
                        <p css={css` margin-top: 0px; background-color: white;`}>
                            {question.content}
                        </p>
                        <div
                            css={css` font-size: 12px; font-style: italic; color: ${gray3};`}>
                            {`Asked by ${question.userName} on
                        ${question.created.toLocaleDateString()}
                        ${question.created.toLocaleTimeString()}`}
                        </div>
                        <AnswerList data={question.answers} />
                    </React.Fragment>
                )}
            </div>
        </Page>
    );
};


// Important note
// When using triple equals (===), we are checking for strict equality. This means
// both the type and the value we are comparing have to be the same. When using
// a double equals (==), the type isn't checked. Generally, it is good practice to
// use the triple equals (===) to perform a strict equality check.

// Important note
// In React, a component can only return a single element. This rule applies to
// conditional rendering logic where there can be only a single parent React
// element being rendered. React Fragment allows us to work around this rule
// because we can nest multiple elements within it without creating a DOM node.