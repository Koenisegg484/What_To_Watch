from django.http import JsonResponse
import joblib
import pandas as pd
from scipy.sparse import hstack
from sklearn.metrics.pairwise import cosine_similarity

def recommend_movies(request):
    if request.method == "GET":
        input_keywords = {
            'genres': request.GET.get('genres', ''),
            'cast': request.GET.get('cast', ''),
            'keywords': request.GET.get('keywords', ''),
            'overview': request.GET.get('overview', ''),
            'popularity': float(request.GET.get('popularity', 80)),
            'release_date': int(request.GET.get('release_date', 2019)),
            'vote_average': float(request.GET.get('vote_average', 1.0))
        }
        
        # Load the trained model artifacts
        similarity_matrix = joblib.load('recommendation_app/ml/similarity_matrix.pkl')
        tfidf_vectorizer = joblib.load('recommendation_app/ml/TF_IDF_Vectorizer.pkl')
        features_prev = joblib.load('recommendation_app/ml/features.pkl')
        scaler = joblib.load('recommendation_app/ml/scaler.pkl')

        # Load the movie dataset
        movies = pd.read_csv('recommendation_app/ml/tmdb_5000_movies.csv')

        # Create a DataFrame for the input data
        input_data = pd.DataFrame({
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

        # Compute similarity scores with the dataset
        predicted_similarity_scores = cosine_similarity(features, features_prev)

        # Get similarity scores and sort
        sim_scores = list(enumerate(predicted_similarity_scores[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get top 10 most similar movies
        top_n = 10
        sim_scores = sim_scores[:top_n]
        movie_indices = [i[0] for i in sim_scores]

        recommended_movies = movies.iloc[movie_indices]

        print(recommended_movies[['id', 'title']])

        return JsonResponse({"recommended_movies": recommended_movies[['id', 'title']].to_dict(orient='records')})
