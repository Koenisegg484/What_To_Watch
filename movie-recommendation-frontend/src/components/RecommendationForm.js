// src/components/RecommendationForm.js
import React, { useState } from 'react';

const RecommendationForm = ({ onGetRecommendations }) => {
  const [formData, setFormData] = useState({
    genres: '',
    cast: '',
    keywords: '',
    overview: '',
    popularity: 50,
    release_date: 2017,
    vote_average: 5.0
  });

  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGetRecommendations(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleNext}>
            <label>
              Do you have any GENRE in mind:
              <br/>
              <center>
              <input type="text" name="genres" value={formData.genres} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Next</button>
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleNext}>
            <label>
              Preffered actors CAST :
              <center>
              <input type="text" name="cast" value={formData.cast} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Next</button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleNext}>
            <label>
              What kind of story or <br/>any keywords in mind:
              <center>
              <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Next</button>
          </form>
        );
      // case 3:
      //   return (
      //     <form onSubmit={handleNext}>
      //       <label>
      //         Overview:
      //         <center>
      //         <input type="text" name="overview" value={formData.overview} onChange={handleChange} />
      //         </center>
      //       </label>
      //       <button type="submit">Next</button>
      //     </form>
      //   );
      case 3:
        return (
          <form onSubmit={handleNext}>
            <label>
              How popular ???(0-100):
              <center>
              <input type="number" name="popularity" value={formData.popularity} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Next</button>
          </form>
        );
      case 4:
        return (
          <form onSubmit={handleNext}>
            <label>
              Any specific release year ??? :
              <center>
              <input type="number" name="release_date" value={formData.release_date} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Next</button>
          </form>
        );
      case 5:
        return (
          <form onSubmit={handleSubmit}>
            <label>
              Choose a lucky number, but I would say go for higher (0-10) :
              <center>
              <input type="number" name="vote_average" step="0.1" value={formData.vote_average} onChange={handleChange} />
              </center>
            </label>
            <button type="submit">Get Recommendations</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="recommendation-form">
      {renderStep()}
    </div>
  );
};

export default RecommendationForm;
