// src/Recommendations.js
import React from 'react';
import { useLocation } from 'react-router-dom';


function Recommendations() {
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];

  return (
    <div className="recommendations-container">
      <h2>Recommended Movies</h2>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
