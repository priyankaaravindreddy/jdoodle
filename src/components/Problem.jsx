import React from 'react';

const Problem = ({ problem  }) => {

  return (
    <div>
      <h2>{problem?.question}</h2>
      <p>{problem?.description}</p>
    </div>
  );
};

export default Problem;
