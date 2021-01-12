import os
from app.models import db
from flask import Blueprint, request, jsonify
import requests

search_routes = Blueprint('search', __name__)

rapid_api_key = os.environ.get('RAPID_API_KEY')

# TEXT SEARCH OF DATABASE
@search_routes.route('/<search_input>')
def search_imdb_api(search_input):
    url = "https://imdb8.p.rapidapi.com/title/auto-complete"
    querystring = {"q": search_input}
    headers = {
        'x-rapidapi-key': rapid_api_key,
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    result_list = []

    if response: 
        search_results = dict(response.json())
        for result in search_results['d']:
            if 'q' in result:
                if result['q'] == 'feature':
                    image = ""
                    if 'i' in result:
                        image = result['i']['imageUrl']

                    # print(f"ID!!!!!!! {result['id']}")
                    # print(f"TITLE!!!!!!! {result['l']}")
                    # print(f"STARRING!!!!!!! {result['s']}")
                    
                    result_list.append({
                        'id': result['id'],
                        'title': result['l'],
                        'image': image,
                        'starring': result['s'],
                    })

        results = dict({
            'movies': result_list
        })
        # print(f'RESULT LIST!!!! {results}')
        return results
    else:
        return {"errors": "No results found"}


def to_dict(result):
    pass
