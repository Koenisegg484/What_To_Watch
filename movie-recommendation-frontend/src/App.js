// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import RecommendationForm from './components/RecommendationForm';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [started, setStarted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const startRecommendation = () => {
    setStarted(true);
  };

  const getRecommendations = async (formData) => {
    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(`http://127.0.0.1:8000/api/recommend/?${queryParams}`);
      const data = await response.json();
      console.log('Received data:', data);
      setMovies(data.recommended_movies);
      setShowForm(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <div className="overlay"></div>
      <Navbar />
      {started ? (
        <>
          {showForm ? (
            <RecommendationForm onGetRecommendations={getRecommendations} />
            ) : (
              <MovieList movies={movies} />
            )}
        </>
      ) : (
        <Intro onStart={startRecommendation} />
      )}
    </div>
    
  );
};

export default App;
