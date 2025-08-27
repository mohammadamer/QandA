import React from 'react';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AskPage } from './Pages/AskPage';
import { SearchPage } from './Pages/SearchPage';
import { SignInPage } from './Pages/SignInPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { QuestionPage } from './Pages/QuestionPage';

function App() {
  return (
    <BrowserRouter>
      <div css={css` font-family: ${fontFamily}; font-size: ${fontSize}; color: ${gray2}; `}>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="ask" element={<AskPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="questions/:questionId" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


// Important Note
// It is important to include the /** @jsxImportSource @emotion/
// react */ comment; otherwise, the transpilation process will error out. It is
// also important that this is placed right at the top of the file.

// Important note
// Route parameters are defined in the path with a colon in front of them. The
// value of the parameter is then available to destructure in the useParams hook.