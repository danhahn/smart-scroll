import * as React from "react";
import styled from "styled-components";
import "./styles.css";
import LockedContainer from "./components/LockedContainer/";

export default function App() {
  return (
    <div className="App">
      <Placeholder color="lime">Item 1</Placeholder>
      <Placeholder color="pink">Item 2</Placeholder>
      <LockedContainer />
      <Placeholder color="peach">Item 3</Placeholder>
      <Placeholder color="limegreen">Item 4</Placeholder>
    </div>
  );
}

const Placeholder = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(20vh / 5);
`;
