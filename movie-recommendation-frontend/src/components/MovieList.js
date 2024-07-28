// src/components/MovieList.js
import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      <h2>Recommended Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
