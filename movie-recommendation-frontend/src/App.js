// src/App.js
import React, { useState } from 'react';
import RecommendationForm from './components/RecommendationForm';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);

  const getRecommendations = async (formData) => {
    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(`http://127.0.0.1:8000/api/recommend/?${queryParams}`);
      const data = await response.json();
      setMovies(data.recommended_movies);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <h1>Movie Recommendation System</h1>
      <RecommendationForm onGetRecommendations={getRecommendations} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
