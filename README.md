# Slang Translator Application

This application consists of a React frontend and a Flask backend for translating slang terms and sentences.

## Prerequisites

- Node.js (v18 or later)
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

## Running with Docker Compose

To run the application using Docker Compose:

1. Make sure you have Docker and Docker Compose installed on your system.

2. Navigate to the root directory of the project (where the `docker-compose.yml` file is located).

3. Build and start the containers:
   ```
   docker-compose up --build
   ```

4. Once the containers are up and running, you can access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5555

5. To stop the application, press `Ctrl + C` in the terminal where docker-compose is running, or run:
   ```
   docker-compose down
   ```

This method will start both the frontend and backend services in containers, making it easy to run the entire application stack with a single command.

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
