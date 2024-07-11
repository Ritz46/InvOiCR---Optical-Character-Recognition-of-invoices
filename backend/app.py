import pickle
from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS
import os
myclient = pymongo.MongoClient("mongodb+srv://Rithick:Rithick@cluster0.yjcoev8.mongodb.net/")
mydb = myclient["OCR"]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

try:
    with open('model/easyocr_model.pkl', 'rb') as f:
        reader = pickle.load(f)
    print('Model loaded successfully')
except Exception as e:
    
    print(f'Error loading model: {e}')
    reader = None
    
@app.route('/contact-Us', methods=['POST'])
def contact_us():
    try:
        # Retrieve data from the request
        form_data = request.get_json()
        name = form_data.get('name')
        email = form_data.get('email')
        message = form_data.get('message')
        
        my_col = mydb["queries"]
        
        query = {
            'name': name,
            'email': email,
            'message': message
        }
        my_col.insert_one(query)

        

        return jsonify({"status": "success", "message": "Form data received"}), 200
    except Exception as e:

        
        return jsonify({"status": "error", "message": "Failed to process form data"}), 500

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


@app.route('/uploadFields', methods=['POST'])
def uploadFields():
    
    try:
        data = request.get_json()
        docNo = data['documentNumber']
        invNo = data['invoiceNumber']
        subsi = data['subsidiary']
        billdate = data['billDate']
        taxamt = data['tax_amount']
        gstin = data['GSTIN']
        
        my_col = mydb["Field-Extraction"]
        my_col.insert_one({
            'documentNumber': docNo,
            'invoiceNumber': invNo,
            'subsidiary': subsi,
            'billDate': billdate,
            'taxamt': taxamt,
            'GSTIN': gstin
        })
        
        print(f"Received contact form submission: {data}")

        return jsonify({"status": "success", "message": "Form data received"}), 200
    except Exception as e:
        print(f"Error processing form submission: {e}")
        
        return jsonify({"status": "error", "message": "Failed to process form data"}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({ 'message': 'Hello, World!' }), 200

if __name__ == '__main__':
    app.run(debug=True, port=7000)  