import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Journal = () => {
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);

  // Fetch journals from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/journals/')
      .then((response) => {
        setJournals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching journals:", error);
      });
  }, []);

  // Handle journal submission
  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/api/journals/', { content })
      .then((response) => {
        setJournals([...journals, response.data]);
        setContent('');
      })
      .catch((error) => {
        console.error("Error submitting journal:", error);
      });
  };

  return (
    <div className="journal-container">
      <h2>Journal Entries</h2>

      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Write your journal entry..." 
      />

      <button onClick={handleSubmit}>Submit Journal</button>

      <div className="journal-list">
        {journals.map((journal, index) => (
          <div key={index} className="journal-entry">
            <p>{journal.content}</p>
            <small>Sentiment: {journal.sentiment_score}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
