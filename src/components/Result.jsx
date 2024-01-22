import React from "react";
import "./result.css";

const Result = ({ results }) => {
  console.log("results ", results);
  return (
    <div className="resultContainer">
      <h2>Results</h2>
      <div className="resultArea">{results}</div>
    </div>
  );
};

export default Result;
