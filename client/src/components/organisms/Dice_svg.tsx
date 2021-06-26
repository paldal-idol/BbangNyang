import React from 'react';
import styled from 'styled-components';

class Dice_svg extends React.Component {
  state = {
    x: 0,
    y: 0,
  };
  mounted: boolean;
  componentDidMount() {
    this.mounted = true;
    // this.tick();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  tick = () => {
    const time = Date.now() / 1000;
    this.setState({
      x: 150 + 100 * Math.cos(time),
      y: 150 + 100 * -Math.abs(Math.sin(time)),
    });
    if (this.mounted) {
      requestAnimationFrame(this.tick);
    }
  };
  render() {
    let interval;
    let count;
    const { x, y } = this.state;
    const down = () => {
      interval = setInterval(this.tick, 100);
    };
    const up = () => {
      clearInterval(interval);
      alert();
    };
    return (
      <>
        <button onMouseDown={down} onMouseUp={up}>
          클릭
        </button>
        <svg width="300" height="300">
          {/* center */}
          <circle r="5" cx="150" cy="150" fill="black" />
          <circle r="5" cx={x} cy={y} fill="black" />
        </svg>
      </>
    );
  }
}
export default Dice_svg;
