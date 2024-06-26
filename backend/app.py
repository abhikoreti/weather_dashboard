from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from config import Config

app = Flask(__name__)
CORS(app)

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    api_key = Config.OPENWEATHERMAP_API_KEY
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/forecast', methods=['GET'])
def get_forecast():
    city = request.args.get('city')
    api_key = Config.OPENWEATHERMAP_API_KEY
    url = f'http://api.openweathermap.org/data/2.5/forecast/daily?q={city}&cnt=7&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)