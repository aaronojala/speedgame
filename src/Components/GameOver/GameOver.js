import React from 'react';
import './GameOver.css';

const closeHandler = () => {
    window.location.reload();
}

const GameOver = (props) => {
    return (
        <div className="overlay">  
            <div className="gameover_box">
                <h2>Game over</h2>
                <p>You drank {props.score} beers</p>
            <button onClick={closeHandler}>Close</button>
            </div>
        </div>
    );    
};

export default GameOver;