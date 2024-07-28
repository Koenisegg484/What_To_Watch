// src/components/Intro.js
import React from 'react';

const Intro = ({ onStart }) => {
  return (
    <div className="intro">
      <h1>Welcome to Movie Recommendation System</h1>
      <p>Find your next favorite movie!</p>
      <button onClick={onStart}>Find your next movie</button>
    </div>
  );
};

export default Intro;
