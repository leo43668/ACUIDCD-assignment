
````markdown
# Mental Health Avatar App - README

This project is a Mental Health Avatar App that evolves based on the user's emotional wellbeing, daily habits, and relationships. It integrates a Rasa chatbot for reflection, goal tracking, journal entries, and progress tracking.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Virtual Environment Setup](#virtual-environment-setup)
3. [Install Dependencies](#install-dependencies)
4. [Database Setup & Migrations](#database-setup--migrations)
5. [Running the Backend (Django)](#running-the-backend-django)
6. [Running the Frontend (React)](#running-the-frontend-react)
7. [Connecting Rasa Chatbot](#connecting-rasa-chatbot)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## Project Setup

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone github.com/leo43668/ACUIDCD-assignment
cd ACUIDCD-assignment
````

### 2. Virtual Environment Setup

It's recommended to use a virtual environment to avoid conflicts with other Python packages.

```bash
# Create a virtual environment (use the python version you need)
python3 -m venv venv

# Activate the virtual environment
# On MacOS/Linux
source venv/bin/activate
# On Windows
venv\Scripts\activate
```

### 3. Install Dependencies

Once the virtual environment is activated, install the required Python dependencies.

```bash
pip install -r requirements.txt
```

For the **frontend (React)** dependencies, navigate to the `frontend/` directory and run:

```bash
cd frontend
npm install
```

---

## Database Setup & Migrations

### 1. Django Migrations

After installing the dependencies, set up the database by applying migrations.

```bash
# Navigate back to the backend folder if you're not there
cd ..

# Make migrations for Django models
python manage.py makemigrations

# Apply the migrations to the database
python manage.py migrate
```

### 2. Create Superuser (Optional)

To manage the database via Django admin, you can create a superuser.

```bash
python manage.py createsuperuser
```

---

## Running the Backend (Django)

Make sure the backend server is running to serve API requests for your frontend.

```bash
# Run Django development server
python manage.py runserver
```

This will start the Django backend server on `http://127.0.0.1:8000/`.

---

## Running the Frontend (React)

To run the React frontend, navigate to the `frontend/` folder and start the React development server.

```bash
cd frontend

# Start the React development server
npm start
```

The React frontend will be available at `http://localhost:3000/`.

---

## Connecting Rasa Chatbot

1. **Start the Rasa Chatbot Server**: First, ensure your Rasa server is running. Open a new terminal window and navigate to the Rasa project directory.

```bash
# Navigate to your Rasa project folder
cd rasa_project

# Start the Rasa server
rasa run
```

2. **Rasa Action Server**: For custom actions like logging mood or setting goals, start the action server.

```bash
# Start the Rasa action server
rasa run --enable-api --cors "*" --debug
```

---

## Testing

You can use Django's built-in test framework or **Postman** to test the APIs for mood tracking, journal entries, and goal tracking. Below are the sample API endpoints:

* **Mood Data**: `GET http://127.0.0.1:8000/api/moods/`
* **Avatar State**: `GET http://127.0.0.1:8000/api/avatar_state/`
* **Goals**: `GET http://127.0.0.1:8000/api/goals/`
* **Journal Entries**: `GET http://127.0.0.1:8000/api/journals/`

For **Rasa chatbot testing**:

* **Send a message to the bot**: `POST http://localhost:5005/webhooks/rest/webhook`

  * Body:

    ```json
    {
      "sender": "user",
      "message": "How do I feel today?"
    }
    ```

You should see responses from the Rasa bot.

---

## Deployment

For deployment, you can use the following:

1. **Django Backend Deployment**:

  AWS

2. **React Frontend Deployment**:

   AWS

Make sure the backend and frontend URLs are updated in production to avoid CORS issues.

---

## Notes

* Ensure your **CORS** settings are configured correctly to avoid any cross-origin issues between the frontend and backend. You may need to install `django-cors-headers` to configure this.

  ```bash
  pip install django-cors-headers
  ```

  Add `corsheaders` to `INSTALLED_APPS` and configure it in `settings.py`:

  ```python
  INSTALLED_APPS = [
      # other apps...
      'corsheaders',
  ]

  MIDDLEWARE = [
      'corsheaders.middleware.CorsMiddleware',
      'django.middleware.common.CommonMiddleware',
      # other middleware...
  ]

  CORS_ALLOWED_ORIGINS = [
      "http://localhost:3000",
  ]
  ```

* **Environment variables**: If you're using **Rasa**, you may need to configure **Rasa endpoints** and **API keys** in `.env` or `credentials.yml`.
