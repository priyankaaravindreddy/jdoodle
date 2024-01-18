import React from 'react';
import './problem.css';

const Problem = ({ problem  }) => {

  return (    
    <div className="problemContainer">
        <div className="problemQues">{problem?.question? `Ques: ${problem.question}`: ''}</div>
        <div className="problemDesc">{problem?.description}</div>
    </div>
  );
};

export default Problem;
