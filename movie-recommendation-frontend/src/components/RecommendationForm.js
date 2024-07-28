// src/components/RecommendationForm.js
import React, { useState } from 'react';

const RecommendationForm = ({ onGetRecommendations }) => {
  const [formData, setFormData] = useState({
    genres: '',
    cast: '',
    keywords: '',
    overview: '',
    popularity: 80,
    release_date: 2019,
    vote_average: 1.0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGetRecommendations(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Genres:
        <input type="text" name="genres" value={formData.genres} onChange={handleChange} />
      </label>
      <label>
        Cast:
        <input type="text" name="cast" value={formData.cast} onChange={handleChange} />
      </label>
      <label>
        Keywords:
        <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} />
      </label>
      <label>
        Overview:
        <input type="text" name="overview" value={formData.overview} onChange={handleChange} />
      </label>
      <label>
        Popularity:
        <input type="number" name="popularity" value={formData.popularity} onChange={handleChange} />
      </label>
      <label>
        Release Date:
        <input type="number" name="release_date" value={formData.release_date} onChange={handleChange} />
      </label>
      <label>
        Vote Average:
        <input type="number" name="vote_average" step="0.1" value={formData.vote_average} onChange={handleChange} />
      </label>
      <button type="submit">Get Recommendations</button>
    </form>
  );
};

export default RecommendationForm;
