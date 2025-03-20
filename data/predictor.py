from flask import Flask, jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open ('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/api', methods=["POST"])
def salary_prediction():
    try:
        print(request)

        raw_data = request.get_json(force=True)
        df = pd.json_normalize(raw_data)

        print(df)

        prediction = model.predict(df)
        print(prediction)
        return jsonify({"Salary prediction": str(round(float(prediction), 2))})
    except:
        print("error")
        return jsonify({"Message": "Error"})

if __name__ == '__main__':
    app.run(debug=True)