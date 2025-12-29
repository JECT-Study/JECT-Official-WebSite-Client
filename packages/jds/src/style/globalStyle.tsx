/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "Pretendard Variable", "D2Coding", sans-serif;
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
