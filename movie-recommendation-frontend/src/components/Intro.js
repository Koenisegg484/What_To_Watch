// src/components/Intro.js
import React from 'react';

const Intro = ({ onStart }) => {
  return (
    <div className="intro">
      <h1>Welcome to Movie Recommendation System</h1>
      <button onClick={onStart}>Find your next Favourite movie</button>
    </div>
  );
};

export default Intro;
