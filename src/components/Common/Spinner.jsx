import React from "react";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 300px auto;
  color: blue;
`;

function Spinner(props) {
  return <HashLoader css={override} />;
}

export default Spinner;
