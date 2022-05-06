import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const StyledRnd = styled(Rnd)`
  border: 1px solid blue;
`;

const Container = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid red;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(https://pbs.twimg.com/media/FR1pqaWXwAQcp7K?format=jpg&name=large);
  background-size: 100% 100%;
`;

const App = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 320,
    height: 390,
  });

  const onResize = (
    event: MouseEvent,
    direction: string,
    ref: any,
    delta: {
      width: number;
      height: number;
    }
  ) => {
    const { width, height } = ref.style;
    console.log(width);

    setPosition((prevPosition) => ({
      ...prevPosition,
      width,
      height,
    }));
  };

  const onDragStop = (d: any) => {
    const { x, y } = d;
    setPosition((prevPosition) => ({
      ...prevPosition,
      x,
      y,
    }));
  };

  const cardRef = useRef<HTMLDivElement | null>(null);
  const onDownloadBtn = () => {
    if (cardRef.current) {
      const card = cardRef.current;

      domtoimage.toBlob(card).then((blob) => {
        saveAs(blob, "card.png");
      });
    }
  };

  return (
    <Container>
      <StyledRnd
        default={position}
        onResize={onResize}
        onDragStop={onDragStop}
        bounds="parent"
        lockAspectRatio={true}
      >
        <Image ref={cardRef}></Image>
        <button onClick={onDownloadBtn}>다운로드 버튼</button>
        <p>
          Width: {cardRef.current?.clientWidth || 0}px, Height:
          {cardRef.current?.clientHeight || 0}
          px
        </p>
      </StyledRnd>
    </Container>
  );
};

export default App;
