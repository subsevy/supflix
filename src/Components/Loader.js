import React from "react";
import styled from "styled-components";

const Conatiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 22px;
`;

export default () => (
  <Conatiner>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
  </Conatiner>
);
