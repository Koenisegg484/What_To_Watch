import ast


def convert_genres(genre):
    genre_list = []
    for i in ast.literal_eval(genre):
        genre_list.append(i['name'].replace(" ", ""))
    
    return genre_list

def extract_cast(cast):
    cast_list = []
    counter = 0
    for i in ast.literal_eval(cast):
        if counter != 3:
            cast_list.append(i['name'].replace(" ", ""))
            counter += 1
        else:
            return cast_list
        
def get_director(crew):
    director_list = []
    for i in ast.literal_eval(crew):
        if i['job'] == 'Director':
            director_list.append(i['name'].replace(" ", ""))
    return director_list

def process_cast(x):
    try:
        # Convert the string representation to a list
        cast_list = ast.literal_eval(x)
        # Join the list elements into a single string separated by spaces
        return ' '.join(cast_list)
    except (ValueError, SyntaxError):
        # Handle cases where conversion fails
        return ''