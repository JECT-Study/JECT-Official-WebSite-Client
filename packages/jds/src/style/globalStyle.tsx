/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';

import D2Coding from '../../fonts/D2Coding.woff2';
import PretendardVariable from '../../fonts/PretendardVariable.woff2';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Pretendard Variable';
        src: url(${PretendardVariable}) format('woff2-variations');
        font-weight: 45 920;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'D2Coding';
        src: url(${D2Coding}) format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      body {
        font-family: 'Pretendard Variable', 'D2Coding', sans-serif;
      }

      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul,
      ol {
        list-style: none;
      }

      button {
        border: none;
        background: none;
        cursor: pointer;
      }
    `}
  />
);
