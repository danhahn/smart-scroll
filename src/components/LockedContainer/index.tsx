import React from "react";
import styled from "styled-components";

const LockedContainer = () => {
  const containerEl = React.useRef<any>(null);
  const [scrollPos, setScrollPos] = React.useState(null);
  const [isLocked, setIsLocked] = React.useState(false);
  const [fristPos, setFirstPos] = React.useState(null);
  const [lastPos, setLastPos] = React.useState(null);

  React.useEffect(() => {
    window.addEventListener("scroll", updateScrollPos);
    return () => window.removeEventListener("scroll", updateScrollPos);
  }, []);

  React.useEffect(() => {
    containerEl.current.addEventListener("scroll", updateInnerPos);
  }, []);

  const updateScrollPos = () => {
    setScrollPos(Math.round(containerEl.current.getBoundingClientRect().y));
  };

  const updateInnerPos = () => {
    const first = containerEl.current
      .querySelector(":first-of-type")
      .getBoundingClientRect().y;
    const last = containerEl.current
      .querySelector(":last-of-type")
      .getBoundingClientRect().y;

    setFirstPos(first);
    setLastPos(last);
  };

  React.useEffect(() => {
    if (scrollPos <= 0) {
      setIsLocked(true);
    }
  }, [scrollPos]);

  return (
    <Container isLocked={isLocked} ref={containerEl}>
      <Placeholder color="red">
        {scrollPos} {fristPos} {lastPos}
      </Placeholder>
      <Placeholder color="blue">
        {scrollPos} {fristPos} {lastPos}
      </Placeholder>
      <Placeholder color="green">
        {scrollPos} {fristPos} {lastPos}
      </Placeholder>
    </Container>
  );
};

const Container = styled.div<{ isLocked: boolean }>`
  position: ${props => (props.isLocked ? "fixed" : "static")};
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: lightblue;
  display: grid;
  grid-template-rows: 100vh 100vh 100vh;
  overflow-y: ${props => (props.isLocked ? "scroll" : "hidden")};
  scroll-snap-type: y mandatory;
`;

const Placeholder = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(100vh / 5);
  scroll-snap-align: start;
`;

export default LockedContainer;
