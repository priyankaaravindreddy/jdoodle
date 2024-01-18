import React from 'react';
import './result.css';

const Result = ({ userAnswers, problems }) => {

  return (
    <div className="resultContainer">
      <h2>Results</h2>
      <div className="resultArea"></div>
    </div>
  );
};

export default Result;
