import React from 'react';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';

function App() {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
}

export default App;


// Important Note
// It is important to include the /** @jsxImportSource @emotion/
// react */ comment; otherwise, the transpilation process will error out. It is
// also important that this is placed right at the top of the file.