import { useRef, useState } from "react";
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
  background-image: url(https://avatars.githubusercontent.com/u/88266129?v=4);
  background-size: 100% 100%;
`;

const Button = styled.button`
  display: flex;
  margin: 0.5rem auto;
  border: none;
  background-color: skyblue;
  padding: 0.5rem 0.5rem;
  border-radius: 1.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Info = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const App = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 390,
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
        <Button onClick={onDownloadBtn}>다운로드 버튼</Button>
        <Info>
          Width: {cardRef.current?.clientWidth || 0}px, Height:
          {cardRef.current?.clientHeight || 0}
          px
        </Info>
      </StyledRnd>
    </Container>
  );
};

export default App;
