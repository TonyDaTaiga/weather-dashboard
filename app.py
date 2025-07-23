from flask import Flask, render_template, request, jsonify
import requests
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

def kelvin_to_celsius(kelvin):
    return round(kelvin - 273.15, 2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def get_weather():
    try:
        city = request.form['city']
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={app.config['WEATHER_API_KEY']}"
        response = requests.get(url)
        data = response.json()

        if response.status_code == 200:
            weather_data = {
                'city': data['name'],
                'country': data['sys']['country'],
                'temperature': kelvin_to_celsius(data['main']['temp']),
                'description': data['weather'][0]['description'],
                'icon': data['weather'][0]['icon'],
                'humidity': data['main']['humidity'],
                'wind_speed': data['wind']['speed']
            }
            return jsonify({'success': True, 'data': weather_data})
        else:
            return jsonify({'success': False, 'message': 'City not found'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)