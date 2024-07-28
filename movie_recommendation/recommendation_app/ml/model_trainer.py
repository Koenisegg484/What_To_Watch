import numpy as np
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from helpers import convert_genres, extract_cast, process_cast
from scipy.sparse import hstack
from sklearn.metrics.pairwise import cosine_similarity

# Load and preprocess movie data
movies = pd.read_csv('tmdb_5000_movies.csv')
credits = pd.read_csv('tmdb_5000_credits.csv')    
movies = movies.merge(credits, on='title')
movies = movies[['id', 'title', 'genres', 'keywords', 'overview', 'popularity', 'release_date', 'vote_average', 'cast']]
movies.dropna(inplace=True)

# Simplify and preprocess data
movies['genres'] = movies['genres'].apply(convert_genres).apply(lambda x: ' '.join(x))
movies['keywords'] = movies['keywords'].apply(convert_genres).apply(lambda x: ' '.join(x))
movies['cast'] = movies['cast'].apply(extract_cast).apply(process_cast)
movies['release_date'] = pd.to_datetime(movies['release_date']).dt.year
movies['overview'] = movies['overview'].apply(lambda x: ' '.join(x))
movies['combined_features'] = (movies['genres'] + ' ' + movies['cast'] + ' ' + movies['keywords'] + ' ' + movies['overview'])

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words="english")
combined_features_tfidf = tfidf_vectorizer.fit_transform(movies['combined_features'])

# Scale numerical features
scaler = StandardScaler()
numerical_features = scaler.fit_transform(movies[['popularity', 'release_date', 'vote_average']])

# Combine features
features = hstack([combined_features_tfidf, numerical_features])
similarity_matrix = cosine_similarity(features, features)

# Print shapes for debugging
print("Features shape:", features.shape)
print("Similarity matrix shape:", similarity_matrix.shape)

# Save models
joblib.dump(tfidf_vectorizer, 'TF_IDF_Vectorizer.pkl')
joblib.dump(similarity_matrix, 'similarity_matrix.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(features, 'features.pkl')
print("Process completed")
