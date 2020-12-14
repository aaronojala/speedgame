import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return <div className={`circle ${props.img} ${props.active ? " active" : ""}`} onClick={props.click}></div>;
};

export default Circle;