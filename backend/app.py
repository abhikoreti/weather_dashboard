from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS
from config import Config
from urllib.parse import quote as url_quote
import logging

app = Flask(__name__, static_folder='../frontend/static', template_folder='../frontend/templates')
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/forecast')
def forecast():
    return render_template('forecast.html')

@app.route('/favorite_cities')
def favorite_cities():
    return render_template('favorite_cities.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/historical_weather')
def historical_weather():
    return render_template('historical_weather.html')

@app.route('/weather_alerts')
def weather_alerts():
    return render_template('weather_alerts.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/weather_news')
def weather_news():
    return render_template('weather_news.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400

    api_key = Config.OPENWEATHERMAP_API_KEY

    # Get the latitude and longitude of the city
    geo_url = f'http://api.openweathermap.org/geo/1.0/direct?q={url_quote(city)}&appid={api_key}'
    logging.debug(f"Geolocation URL: {geo_url}")
    
    geo_response = requests.get(geo_url)
    
    if geo_response.status_code != 200:
        logging.error(f"Geolocation API request failed: {geo_response.text}")
        return jsonify({'error': 'Error fetching geolocation data'}), 500
    
    geo_data = geo_response.json()
    logging.debug(f"Geolocation data: {geo_data}")
    
    if not geo_data:
        return jsonify({'error': 'City not found'}), 404

    lat = geo_data[0]['lat']
    lon = geo_data[0]['lon']
    
    # Use the One Call API 3.0
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={api_key}&units=metric'
    logging.debug(f"One Call API URL: {url}")
    
    response = requests.get(url)
    
    if response.status_code != 200:
        logging.error(f"One Call API request failed: {response.text}")
        return jsonify({'error': 'Error fetching weather data'}), 500
    
    data = response.json()
    logging.debug(f"Weather data: {data}")
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
