# Slang Translator Application

This application consists of a React frontend and a Flask backend for translating slang terms and sentences.

## Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- pip (Python package manager)

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```
   python app.py
   ```

   The backend server should now be running on `http://localhost:5555`.

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

   The frontend application should now be running on `http://localhost:5173`.

## Accessing the Application

Open your web browser and go to `http://localhost:5173` to use the Slang Translator application.

## Stopping the Application

To stop the application:

1. In the terminal running the frontend, press `Ctrl + C`.
2. In the terminal running the backend, press `Ctrl + C`.
3. If you created a virtual environment for the backend, deactivate it:
   ```
   deactivate
   ```

## Environment Variables

The frontend uses an environment variable for the API URL. If you need to change the backend URL, create a `.env` file in the `frontend` directory with the following content:
