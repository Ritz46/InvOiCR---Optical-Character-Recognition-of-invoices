# OCR Project with React and Flask

Welcome to InvOiCR project repository! This project combines deep learning-based OCR functionality with a web application using React for the frontend and Flask for the backend.

## Project Overview

This project aims to provide OCR capabilities through a user-friendly web interface. The backend uses TensorFlow and Keras for OCR model implementation, while the frontend is built using React for seamless integration and interactive user experience.

## Installation and Setup

### Backend (Flask)

1. Navigate to the `backend` folder:
   --> cd backend

2. Install Python dependencies:
   --> pip install -r requirements.txt

3. Run the Flask server:
   --> python app.py

The backend server will start running at `http://localhost:7000`.

### Frontend (React)

1. Navigate to the `frontend/my-app` folder:
   --> cd frontend/my-app

2. Install Node.js dependencies:
   --> npm install

3. Start the React development server:
   --> npm start
   
The frontend server will automatically open your default browser and load the OCR web application at `http://localhost:3000`.

## Usage

- Upload images containing text to the web interface.
- The OCR model will process the images and extract text information.
- Display the OCR results on the web page for user interaction.

## Additional Information

- Ensure both backend (`Flask`) and frontend (`React`) servers are running concurrently for full application functionality.
- For any issues or further assistance, refer to the project documentation.

