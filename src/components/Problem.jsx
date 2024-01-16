import React from 'react';

const Problem = ({ problem, onSubmit }) => {
  const handleSubmit = (answer) => {
    onSubmit(answer);
  };

  return (
    <div>
      <h2>{problem?.question}</h2>
      <p>{problem?.description}</p>
      <button onClick={() => handleSubmit(/* user's answer */)}>Submit Answer</button>
    </div>
  );
};

export default Problem;
