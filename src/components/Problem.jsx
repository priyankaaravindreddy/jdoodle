import React from 'react';
import './problem.css';

const Problem = ({ problem, idx  }) => {

  return (    
    <div className="problemContainer">
        <div className="problemQues">{problem?.question? `Ques ${idx}: ${problem.question}`: ''}</div>
        <div className="problemDesc">{problem?.description}</div>
    </div>
  );
};

export default Problem;
