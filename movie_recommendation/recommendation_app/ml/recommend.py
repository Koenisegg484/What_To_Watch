import joblib
import pandas as pd
from scipy.sparse import hstack
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

def recommend_movies(input_keywords, top_n=10):
    # Load the trained model artifacts
    similarity_matrix = joblib.load('similarity_matrix.pkl')
    tfidf_vectorizer = joblib.load('TF_IDF_Vectorizer.pkl')
    features_prev = joblib.load('features.pkl')
    scaler = joblib.load('scaler.pkl')

    # Load the movie dataset
    movies = pd.read_csv('tmdb_5000_movies.csv')

    # Create a DataFrame for the input data
    input_data = pd.DataFrame({
        # Combine text features into a single column for TF-IDF
        'combined_features' : (input_keywords['genres'] + ' ' +
                               input_keywords['cast'] + ' ' +
                               input_keywords['keywords'] + ' ' +
                               input_keywords['overview']),
        'popularity': [input_keywords['popularity']],
        'release_date': [input_keywords['release_date']],
        'vote_average': [input_keywords['vote_average']]
    })

    

    # Transform text features using the loaded TF-IDF vectorizer
    combined_features_tfidf = tfidf_vectorizer.transform(input_data['combined_features'])

    # Scale numerical features using the loaded scaler
    numerical_features = scaler.transform(input_data[['popularity', 'release_date', 'vote_average']])

    # Combine TF-IDF features and numerical features
    features = hstack([combined_features_tfidf, numerical_features])

    # Print shapes for debugging
    print("Input features shape:", features.shape)
    print("Similarity matrix shape:", similarity_matrix.shape)

    # Compute similarity scores with the dataset
    predicted_similarity_scores = cosine_similarity(features, features_prev)

    # Get similarity scores and sort
    sim_scores = list(enumerate(predicted_similarity_scores[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get top N most similar movies
    sim_scores = sim_scores[:top_n]
    movie_indices = [i[0] for i in sim_scores]

    return movies.iloc[movie_indices]

# Example usage (input keywords should come from the user)
input_keywords = {
    'genres': '',
    'cast': '',
    'keywords': '',
    'overview': '',
    'popularity': 80,
    'release_date': 2019,
    'vote_average': 1.0
}

recommendations = recommend_movies(input_keywords)
print(recommendations[['id', 'title']])
