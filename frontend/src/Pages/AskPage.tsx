import React from 'react';
import { Page } from './Page';
import {
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from '../Styles';
import { useForm } from 'react-hook-form';
import { postQuestion } from '../QuestionData';

type FormData = { title: string; content: string };

export const AskPage = () => {
  const { register, errors, handleSubmit, formState } = useForm<FormData>({
    mode: 'onBlur',
  });
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submitForm)}>
        <Fieldset disabled={formState.isSubmitting || successfullySubmitted}>
          <FieldContainer>
            <FieldLabel htmlFor="title"> Title </FieldLabel>
            <FieldInput
              id="title"
              type="text"
              name="title"
              ref={register({
                required: true,
                minLength: 10,
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <FieldError> You must enter the question title </FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>The title must be at least 10 characters </FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content"> Content </FieldLabel>
            <FieldTextArea
              id="content"
              name="content"
              ref={register({ required: true, minLength: 50 })}
            />
            {errors.content && errors.content.type === 'required' && (
              <FieldError> You must enter the question content </FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>
                The content must be at least 50 characters
              </FieldError>
            )}
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmitted && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </Fieldset>
      </form>
    </Page>
  );
};

//https://www.carlrippon.com/custom-validation-rules-in-react-hook-form/
//  "react-hook-form": "^7.33.0",
//https://stackoverflow.com/questions/67791756/react-hook-form-error-type-useformregisterformdata-is-not-assignable-to-ty
//"react-hook-form": "^6.12.2",
//export const AskPage = () => <Page title="Ask a question">{null}</Page>;
//lazyLoading Test
//export default AskPage;
