import React, { Component } from 'react';
import Circle from './Components/Circle/Circle';
import GameOver from './Components/GameOver/GameOver';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false,
    rounds: 0,
    circles: [
      { id: 1, img: "beer1" },
      { id: 2, img: "beer2" },
      { id: 3, img: "beer3" },
      { id: 4, img: "beer4" },
    ],
  };

  pace = 1500;
  timer = undefined;

  clickHandler = (id) => {
    console.log('wow ' + id);
    this.playAudio('beerOpen');

    if (this.state.current !== id) {
      this.playAudio('gameOver');
      this.stopHandler();
      return;
    }

    this.setState({
      score: this.state.score +1,
      rounds: 0,
    });
  };

  playAudio = (sound) => {
    var audio = new Audio(`/assets/${sound}.wav`);
    audio.play();
  }

  nextCircle = () => {

    if (this.state.rounds >= 5){
      this.stopHandler();
      return;
    }

    let nextActive = undefined;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current)

    this.setState ({
      current: nextActive,
      rounds: this.state.rounds + 1,
    });

    this.pace *= 0.95;
    this.timer = setTimeout(this.nextCircle, this.pace);

    console.log('Active circle is:' , this.state.current);
  };

  startHandler = () => {
    this.nextCircle();
  }

  stopHandler = () => {
    clearTimeout(this.timer);

    this.setState({showGameOver: true})
  };

  render() {
const circles = this.state.circles.map(item => {
  return <Circle 
  key={item.id}
  img={item.img} 
  click={() => this.clickHandler(item.id)}
  active ={this.state.current === item.id} />;
});

    return (
      <div>
        <h1>Speedgame</h1>
    <p>How many beers can you drink? You drank {this.state.score} beers!</p>
        <div>
          {circles}
        </div>
        <button onClick={this.startHandler}>Start</button>
        <button onClick={this.stopHandler}>Stop</button>
    {this.state.showGameOver && <GameOver score={this.state.score} /> }
      </div>
    );
  }
}

export default App;