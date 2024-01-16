// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Problem from "./components/Problem";
import Editor from "./components/Editor";
import Result from "./components/Result";

const App = () => {
  const [problems, setProblems] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  useEffect(() => {
    const submitAnswers = async (code, problems) => {
      const apiEndpoint = "https://api.jdoodle.com/v1/execute";

      try {
        const response = await axios.post(apiEndpoint, {
          clientId: "c0fad38eb03eaa700c9310748610fad1",
          clientSecret:
            "a209966846744088f30ca130dd6251a3647a7e6efc3a95f138b063a9fbdc4ca8",
          script: code,
          stdin: JSON.stringify(problems),
          language: "javascript",
          versionIndex: 0,
        });

        const apiResults = response.data;
        console.log(apiResults);
      } catch (error) {
        console.error("Error calling JDoodle API:", error);
      }
    };

    submitAnswers('print("Hello, World!")', []);
  }, []);

  const handleAnswerSubmission = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  return (
    <>
      <Problem
        problem={problems[currentProblemIndex]}
        onSubmit={handleAnswerSubmission}
      />
      <Editor />
      <Result userAnswers={userAnswers} problems={problems} />
    </>
  );
};

export default App;
