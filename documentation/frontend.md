# Mental Health Dashboard – Code Documentation

## Overview

This React application is a **Mental Health Dashboard** that allows users to:

* Login securely
* Track their moods, goals, and journal entries
* Chat with a Rasa-based AI mental health bot
* View a live-updating avatar that reflects their mood

## Technologies Used

* React (JavaScript Library for building UIs)
* Axios (for making HTTP requests)
* Django REST API
* Rasa (AI chatbot framework)

## File: `Dashboard.js`

This file contains a single React component `<Dashboard />` that includes both authentication and dashboard functionalities.

---

## 1. **State Variables**

```js
const [token, setToken] = useState("");
const [isAuthenticated, setIsAuthenticated] = useState(false);
```

* Stores the login token and tracks if the user is authenticated.

```js
const [loginData, setLoginData] = useState({ username: "", password: "" });
```

* Holds user input for login.

```js
const [data, setData] = useState({ moods: [], goals: [], journals: [] });
```

* Stores all fetched data (mood, goal, journal).

```js
const [newMood, setNewMood] = useState("happy");
const [newGoal, setNewGoal] = useState("");
const [newJournal, setNewJournal] = useState("");
```

* Inputs for adding mood, goal, and journal.

```js
const [chatInput, setChatInput] = useState("");
const [chatHistory, setChatHistory] = useState([]);
const [typing, setTyping] = useState(false);
```

* Controls chatbot input and conversation.

```js
const [avatarMood, setAvatarMood] = useState("neutral");
```

* Avatar emoji reflects the latest mood.

```js
const quickReplies = ["I feel good", "I'm tired", "Feeling anxious", "All is well"];
```

* Predefined quick reply messages for the chatbot.

---

## 2. **Authentication**

```js
const handleLogin = async () => {
  const res = await axios.post("http://127.0.0.1:8000/api/login/", loginData);
  setToken(res.data.token);
  setIsAuthenticated(true);
};
```

* Sends login data to the backend.
* Stores token if successful.

---

## 3. **Fetching Data**

```js
const fetchData = async () => {
  const [moodsRes, goalsRes, journalsRes] = await Promise.all([
    axios.get(...), axios.get(...), axios.get(...)
  ]);
  setData({...});
  setAvatarMood(latestMood);
};
```

* Fetches all data (moods, goals, journals) in parallel.
* Updates state and avatar mood.

---

## 4. **Data Submission**

### Mood

```js
const handleAddMood = async () => {
  await axios.post(..., { mood: newMood }, { headers });
  fetchData();
};
```

* Adds a new mood entry.

### Goal

```js
const handleAddGoal = async () => {
  await axios.post(..., { goal_name: newGoal }, { headers });
  fetchData();
};
```

* Adds a new goal.

### Journal

```js
const handleAddJournal = async () => {
  await axios.post(..., { content: newJournal, mood_tag: newMood }, { headers });
  fetchData();
};
```

* Adds a journal entry linked to mood.

---

## 5. **Chatbot Integration**

```js
const handleChat = async (msg = chatInput) => {
  setChatHistory([...]);
  const res = await axios.post("http://localhost:5005/webhooks/rest/webhook", { message: msg });
  setChatHistory([...]);
  setAvatarMood("happy" | "sad" | "tired");
};
```

* Sends message to chatbot
* Updates conversation history
* Adjusts avatar emoji based on keywords

---

## 6. **Avatar Emoji Mapping**

```js
const avatarEmoji = {
  happy: "😊",
  sad: "😢",
  tired: "😴",
  strong: "💪",
  glowing: "✨",
  neutral: "🙂"
}[avatarMood];
```

* Maps mood string to emoji.

---

## 7. **UI Layout**

### If Not Logged In

Displays login form centered vertically.

### If Logged In

* **Header**: App title and avatar
* **Mood Section**: Dropdown + add + mood list
* **Goals Section**: Input + add + goal list
* **Journal Section**: Textarea + add + journal list
* **Chatbot Section**: Conversation history, quick replies, and input

