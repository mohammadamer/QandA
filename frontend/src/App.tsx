/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Header } from './Header/Header';
import { HomePage } from './Pages/HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AskPage } from './Pages/AskPage';
import { SearchPage } from './Pages/SearchPage';
import { SignInPage } from './Pages/SignInPage';
import { NotFoundPage } from './Pages/NotFoundPages';
import { QuestionPage } from './Pages/QuestionPage';

//lazyLoading Test
//const AskPage = React.lazy(() => import('./Pages/AskPage'));

function App() {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="ask" element={<AskPage />} />

          {/* <Route
            path="ask"
            element={
              <React.Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </React.Suspense>
            }
          /> */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// This is a class component that uses an old refs API in React.
// A React ref is a feature that allows us to access the DOM node.
// class ProblemComponent extends React.Component {
//   render() {
//     return <div ref="div" />;
//   }
// }

export default App;
