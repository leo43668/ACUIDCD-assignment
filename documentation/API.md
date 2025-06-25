# **API Documentation for Mental Health App**

## **Overview**

This API is designed to handle the backend operations for the **Mental Health App**. It supports operations related to mood tracking, journaling, goal setting, avatar state management, and more. The API is built using Django and Django REST Framework (DRF), and integrates with Rasa for chatbot interactions.

---

## **Base URL**

```
http://127.0.0.1:8000/api/
```

---

## **Endpoints**

### **1. Mood Entry Endpoints**

#### **GET /api/moods/**

* **Description**: Retrieve all mood entries.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "mood": "happy",
      "avatar_state": "glowing",
      "date": "2025-06-18"
    },
    ...
  ]
  ```

#### **POST /api/moods/**

* **Description**: Create a new mood entry.
* **Body**:

  ```json
  {
    "mood": "sad",
    "avatar_state": "droopy",
    "date": "2025-06-18"
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "mood": "sad",
    "avatar_state": "droopy",
    "date": "2025-06-18"
  }
  ```

---

### **2. Avatar State Endpoints**

#### **GET /api/avatar\_state/**

* **Description**: Get the current avatar state based on the latest mood.
* **Response**:

  ```json
  {
    "avatar_state": "glowing"
  }
  ```

---

### **3. Goal Endpoints**

#### **GET /api/goals/**

* **Description**: Retrieve all goals.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "goal_name": "Drink 8 glasses of water",
      "is_completed": true,
      "date": "2025-06-18"
    },
    ...
  ]
  ```

#### **POST /api/goals/**

* **Description**: Create a new goal.
* **Body**:

  ```json
  {
    "goal_name": "Drink 8 glasses of water",
    "is_completed": false,
    "date": "2025-06-18"
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "goal_name": "Drink 8 glasses of water",
    "is_completed": false,
    "date": "2025-06-18"
  }
  ```

---

### **4. Journal Entry Endpoints**

#### **GET /api/journals/**

* **Description**: Retrieve all journal entries.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "content": "I had a productive day.",
      "mood_tag": "happy",
      "sentiment_score": 0.8,
      "date": "2025-06-18"
    },
    ...
  ]
  ```

#### **POST /api/journals/**

* **Description**: Create a new journal entry.
* **Body**:

  ```json
  {
    "content": "Today was a rough day.",
    "mood_tag": "sad",
    "sentiment_score": -0.5
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "content": "Today was a rough day.",
    "mood_tag": "sad",
    "sentiment_score": -0.5,
    "date": "2025-06-18"
  }
  ```

---

### **5. Relationship Endpoints**

#### **GET /api/relationships/**

* **Description**: Retrieve all relationships.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "name": "Mom",
      "connection_level": 8,
      "date": "2025-06-18"
    },
    ...
  ]
  ```

#### **POST /api/relationships/**

* **Description**: Add a new relationship.
* **Body**:

  ```json
  {
    "name": "Partner",
    "connection_level": 9,
    "date": "2025-06-18"
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "name": "Partner",
    "connection_level": 9,
    "date": "2025-06-18"
  }
  ```

#### **PATCH /api/relationships/{id}/update\_connection/**

* **Description**: Update the connection level of a specific relationship.
* **Body**:

  ```json
  {
    "connection_level": 7
  }
  ```
* **Response**:

  ```json
  {
    "status": "success",
    "new_connection_level": 7
  }
  ```

---

### **6. Breathing Exercise Endpoints**

#### **GET /api/breathing\_exercises/**

* **Description**: Get a list of all available breathing exercises.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "name": "4-7-8 Breathing",
      "description": "A calming breathing exercise.",
      "duration_in_minutes": 5,
      "created_at": "2025-06-18T12:00:00"
    },
    ...
  ]
  ```

#### **POST /api/breathing\_exercises/**

* **Description**: Create a new breathing exercise.
* **Body**:

  ```json
  {
    "name": "Box Breathing",
    "description": "A 4-count breathing technique.",
    "duration_in_minutes": 4
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "name": "Box Breathing",
    "description": "A 4-count breathing technique.",
    "duration_in_minutes": 4,
    "created_at": "2025-06-18T12:30:00"
  }
  ```

---

### **7. Meditation Timer Endpoints**

#### **GET /api/meditation\_timers/**

* **Description**: Get a list of available meditation timers.
* **Response**:

  ```json
  [
    {
      "id": 1,
      "name": "Mindfulness Timer",
      "duration_in_minutes": 10,
      "created_at": "2025-06-18T12:30:00"
    },
    ...
  ]
  ```

#### **POST /api/meditation\_timers/**

* **Description**: Create a new meditation timer.
* **Body**:

  ```json
  {
    "name": "Deep Breathing Timer",
    "duration_in_minutes": 15
  }
  ```
* **Response**:

  ```json
  {
    "id": 1,
    "name": "Deep Breathing Timer",
    "duration_in_minutes": 15,
    "created_at": "2025-06-18T12:45:00"
  }
  ```

---

## **Authentication**

Currently, the API doesn't require any authentication for the above endpoints. However, you can add JWT or OAuth authentication later for securing these endpoints.

---

## **How to Use the API**

1. **Run the Backend Server**:

   * Navigate to the project directory and run the following command to start the Django backend:

     ```bash
     python manage.py runserver
     ```
2. **Access the API**:

   * Once the server is up and running, you can access the API at the following endpoints:

     * **Mood Entries**: `http://127.0.0.1:8000/api/moods/`
     * **Avatar State**: `http://127.0.0.1:8000/api/avatar_state/`
     * **Goals**: `http://127.0.0.1:8000/api/goals/`
     * **Journals**: `http://127.0.0.1:8000/api/journals/`
     * **Relationships**: `http://127.0.0.1:8000/api/relationships/`
     * **Breathing Exercises**: `http://127.0.0.1:8000/api/breathing_exercises/`
     * **Meditation Timers**: `http://127.0.0.1:8000/api/meditation_timers/`

---

### **Testing the API**

You can test these API endpoints using tools like **Postman** or **Insomnia** by sending the respective HTTP requests.

