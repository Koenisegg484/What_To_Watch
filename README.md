# What_To_Watch

What To Watch is a movie recommendation website built using React for the frontend, Django for the backend, and Python for the machine learning model. The project aims to provide personalized movie recommendations based on user inputs such as genres, cast, keywords, and movie overview.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User-friendly interface to enter movie preferences.
- Progressive form submission where each input field appears one by one.
- Dynamic background image with smooth left-right scrolling.
- Fixed navigation bar with logo and tagline.
- Movie recommendations based on user inputs using a machine learning model.

## Demo

A live demo of the project is available at: [Demo Link]

## Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- Django
- Git

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/What_To_Watch.git
   cd What_To_Watch

2. Set up the Django backend:

    ```sh
    cd movie_recommendation_backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt

3. Run Django migrations:
    ```sh
    
    python manage.py migrate

4. Start the Django development server:
    ```sh
    
    python manage.py runserver

5. Frontend Setup
    Navigate to the frontend directory and install dependencies:

    ```sh
    
    cd ../frontend
    npm install

6. Start the React development server:
    ```sh
    
    npm start

### Usage
- Open your browser and navigate to http://localhost:3000 to access the frontend.
- Start by clicking the "Find Your Next Movie" button and progressively fill out the form fields.
- After submitting the form, you'll be redirected to the recommendations page displaying your movie recommendations.

### API Endpoints
- POST /api/recommend
- Endpoint for getting movie recommendations based on user input.

- Request:
```
{
  "genres": "Action",
  "cast": "Robert Downey Jr.",
  "keywords": "superhero",
  "overview": "A billionaire industrialist and genius inventor.",
  "popularity": 80,
  "release_date": 2019,
  "vote_average": 8.5
}
```
- Response:
```[
  {
    "id": 1,
    "title": "Iron Man",
    "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
  },
  ...
]
```
### Technologies Used
- Frontend: React, CSS
- Backend: Django, Django REST Framework
- Machine Learning: Python, Scikit-Learn, Pandas, Joblib
- Database: SQLite (default for Django, can be changed)
- Version Control: Git

### License
- This project is licensed under the MIT License - see the LICENSE file for details.