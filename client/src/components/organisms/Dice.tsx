import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

//style area
const Dice_div = styled.div`
  width: 500px;
  height: 500px;
`;

const Dice_canvas = styled.canvas`
  z-index: 1;
  position: absolute;
`;

const Dice_Button = styled.button`
  margin-top: 300px;
  margin-left: 180px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;

//implement area
const Dice: React.FC = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let interval;
  let rotate_num = 8;
  let count = 0;

  const drawBackgroundrect = () => {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    let ctx = canvasCtxRef.current;
    ctx!.translate(0, 0);
    ctx!.fillStyle = 'green';
    ctx!.rect(0, 0, 500, 500);
    ctx!.fill();
    ctx!.beginPath();
    ctx!.fillStyle = 'pink';
    ctx!.arc(225, 205, 110, 0, Math.PI, true);
    ctx!.fill();
    ctx!.beginPath();
    ctx!.fillStyle = 'green';
    ctx!.arc(225, 205, 100, 0, Math.PI, true);
    ctx!.fill();
  };

  const drawMoved_rect = (ctx, rotate_num) => {
    ctx.translate(225, 205);
    ctx.rotate((rotate_num * Math.PI) / 90);
    ctx.translate(-225, -205);
    ctx.fillStyle = 'red';
    ctx.fillRect(125, 200, 100, 10);
  };

  const clear = (c) => {
    c.fillStyle = 'green';
    c.arc(225, 215, 100, 0, Math.PI, true);
    c.fill();
  };

  useEffect(() => {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    let ctx = canvasCtxRef.current;
    drawBackgroundrect();
    let rotate_num = 0;
    drawMoved_rect(ctx, rotate_num);
  }, [drawMoved_rect]);

  const render = () => {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    let ctx = canvasCtxRef.current;
    count++;
    if (Math.floor(count / 12) % 2 == 1) {
      rotate_num = -8;
    } else {
      rotate_num = 8;
    }
    clear(ctx);
    drawMoved_rect(ctx, rotate_num);
  };

  const down = () => {
    interval = setInterval(render, 100);
  };

  const up = () => {
    clearInterval(interval);
    let result_score = 11 - Math.abs((count % 24) - 11);
    alert(1 + Math.floor((6 * Math.random() * result_score) / 11));
  };

  return (
    <>
      <Dice_div id="dice">
        <Dice_canvas ref={canvasRef} width="500" height="500"></Dice_canvas>
        <Dice_Button onMouseDown={down} onMouseUp={up}>
          Button
        </Dice_Button>
      </Dice_div>
    </>
  );
};

export default Dice;
