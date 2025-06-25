import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalTracker = () => {
  const [goalName, setGoalName] = useState('');
  const [goals, setGoals] = useState([]);

  // Fetch goals from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/goals/')
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  // Handle goal submission
  const handleGoalSubmit = () => {
    axios.post('http://127.0.0.1:8000/api/goals/', { goal_name: goalName })
      .then((response) => {
        setGoals([...goals, response.data]);
        setGoalName('');
      })
      .catch((error) => {
        console.error("Error submitting goal:", error);
      });
  };

  return (
    <div className="goal-tracker">
      <h2>Goal Tracker</h2>

      <input 
        type="text" 
        value={goalName} 
        onChange={(e) => setGoalName(e.target.value)} 
        placeholder="Enter a goal..." 
      />
      
      <button onClick={handleGoalSubmit}>Add Goal</button>

      <div className="goal-list">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <p>{goal.goal_name} - {goal.is_completed ? 'Completed' : 'Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
