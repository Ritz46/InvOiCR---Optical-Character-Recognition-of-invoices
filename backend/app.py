import pickle
from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS
import os
myclient = pymongo.MongoClient("mongodb+srv://Rithick:Rithick@cluster0.yjcoev8.mongodb.net/")
mydb = myclient["mydatabase"]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
try:
    with open('model/easyocr_model.pkl', 'rb') as f:
        reader = pickle.load(f)
    print('Model loaded successfully')
except Exception as e:
    print(f'Error loading model: {e}')
    reader = None

@app.route('/extract-text', methods=['POST'])
def extract_text():
    if reader is None:
        return jsonify({'message': 'Error loading model'}), 500
    
    
    file = request.files['image']
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    
    text = reader.readtext(file_path)
    extracted_text = ' '.join([i[1] for i in text])
    return jsonify({'message': 'Text extracted successfully', 'result':extracted_text}), 200


@app.route('/', methods=['GET'])
def home():
    return jsonify({ 'message': 'Hello, World!' }), 200

if __name__ == '__main__':
    app.run(debug=True, port=7000)  
