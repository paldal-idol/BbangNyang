import React from 'react';
import styled from 'styled-components';
const Dice_svg = styled.svg`
  z-index: 1;
  position: absolute;
`;
const Dice_h1 = styled.h1`
  margin-top: 200px;
  margin-left: 140px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;
const Dice_Button = styled.button`
  margin-top: 300px;
  margin-left: 100px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;
class Dice extends React.Component {
  dice_number;
  interval;
  state = {
    x: 150,
    y: 50,
  };
  mounted: boolean;

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  tick = () => {
    const time = Date.now() / 500;
    this.setState({
      x: 150 + 100 * Math.cos(time),
      y: 150 + 100 * -Math.abs(Math.sin(time)),
    });
    if (this.mounted) {
      requestAnimationFrame(this.tick);
    } else {
      this.setState({
        x: 150,
        y: 50,
      });
    }
  };
  down = () => {
    this.mounted = true;
    this.interval = setInterval(this.tick, 0);
  };
  up = () => {
    this.mounted = false;
    clearInterval(this.interval);
    let d = Math.random() * (this.state.x + this.state.y) + this.state.y;
    this.dice_number = Math.floor((d % 10) % 6) + 1;
    console.log(this.dice_number);
  };
  render() {
    let count;
    const { x, y } = this.state;
    const mouse_down = this.down;
    const mouse_up = this.up;
    return (
      <>
        <div>
          <Dice_svg width="300" height="300">
            {/* center */}

            <circle r="5" cx="150" cy="150" fill="black" />
            <circle r="5" cx={x} cy={y} fill="black" />
          </Dice_svg>
          <Dice_h1>{this.dice_number}</Dice_h1>
          <Dice_Button onMouseDown={mouse_down} onMouseUp={mouse_up}>
            클릭
          </Dice_Button>
        </div>
      </>
    );
  }
}
export default Dice;
