import React from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";

import colors from "./colors";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Navbar = () => {
  return (
    <header
      css={css`
        background-color: ${colors.dark};
        position: sticky;
        top: 0;
        z-index: 1;
      `}
    >
      <Link
        css={css`
          &:hover {
            text-decoration: underline;
          }
        `}
        to="/"
      >
        Adopt Me!
      </Link>
      <Link
        css={css`
          display: inline-block;
          animation: 1s ${spin} linear infinite;
        `}
        to="/"
      >
        <span aria-label="logo" role="img">
          🦆
        </span>
      </Link>
    </header>
  );
};

export default Navbar;
