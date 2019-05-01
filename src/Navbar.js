import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";

import colors from "./colors";

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
      <Link to="/">
        <span aria-label="logo" role="img">
          🦔
        </span>
      </Link>
    </header>
  );
};

export default Navbar;
