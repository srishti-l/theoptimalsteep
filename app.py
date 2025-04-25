
from flask import Flask, render_template, request, jsonify
import json
import csv
from optimalteatype import MyGraph  
app = Flask(__name__)


graph = MyGraph()

with open("static/teadata.json") as f:
    data = json.load(f)

with open("static/teabenefits.csv", newline="") as csvfile:
    reader = csv.DictReader(csvfile)
    benefit_data = list(reader)

graph.build_graph(data, benefit_data)

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/homepage.html')
def homepage():
    return render_template('homepage.html') 

@app.route('/teafinder.html')
def teafinder():
    return render_template('teafinder.html')  

@app.route('/teatypes.html')
def teatypes():
    return render_template('teatypes.html')  


@app.route('/recommend_single', methods=['POST'])
def recommend_tea():
    health_concern = request.form.get('health_concern')

    if not health_concern:
        return jsonify({"error": "Please provide a health concern."}), 400
    
    recommended_teas = graph.recommend_tea_for_health(health_concern)

    if not recommended_teas:
        return jsonify({"error": f"No teas found for the health concern: {health_concern}"}), 404

    return jsonify({"recommended_teas": recommended_teas})

@app.route('/recommend', methods=['POST'])
def recommend_tea_multi():
    data = request.get_json()
    health_concern_one = data.get('concern_one')
    health_concern_two = data.get('concern_two')
    taste = data.get('taste_preference')


    if not health_concern_one or not health_concern_two:
        return jsonify({"error": "Please provide a health concern."}), 400

    recommended_teas = graph.find_teas([health_concern_one, health_concern_two], taste)

    if not recommended_teas:
        return jsonify({"error": f"No teas found for the health concern: {health_concern_one} and {health_concern_two} and {taste}"}), 404

    return jsonify({"recommended_teas": recommended_teas})

@app.route('/recommend_characteristic', methods=['POST'])
def explore_by_characteristic():
    data = request.get_json()
    characteristic = data.get('characteristic')

    if not characteristic:
        return jsonify({"error": "Please provide a characteristic (taste, origin, caffeine, etc.)."}), 400
    recommended_teas = graph.explore_tea_by_characteristic(characteristic)

    if not recommended_teas:
        return jsonify({"error": f"No teas found for the health concern: {characteristic}"}), 404

    return jsonify({"recommended_teas": recommended_teas})

@app.route('/compare_teas', methods=['POST'])
def compare_teas():
    data = request.get_json()
    tea_one = data.get('tea_one')
    tea_two = data.get('tea_two')
    characteristic = data.get('characteristic')

    if not tea_one or not tea_two or not characteristic:
        return jsonify({"error": "Please provide tea types and comparison criteria"}), 400

    recommended_teas = graph.compare_teas(tea_one, tea_two, characteristic)

    if not recommended_teas:
        return jsonify({"error": f"No specific comparison found for {tea_two} and {tea_two} based on {characteristic}"}), 404

    return jsonify({"recommended_teas": recommended_teas})

if __name__ == "__main__":
    app.run(debug=True)