// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Problem from "./components/Problem";
import Editor from "./components/Editor";
import Result from "./components/Result";
import { questions } from "./sample-questions";

const App = () => {
  const [problems, setProblems] = useState([...questions]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const submitAnswers = async (code, problems) => {
    const apiEndpoint = "https://api.jdoodle.com/v1/execute";

    try {
      const response = await axios.post(apiEndpoint, {
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "a209966846744088f30ca130dd6251a3647a7e6efc3a95f138b063a9fbdc4ca8",
        script: code,
        stdin: JSON.stringify(problems),
        language: "php",
        versionIndex: 0,
      });

      const apiResults = response.data;
      console.log(apiResults);
    } catch (error) {
      console.error("Error calling JDoodle API:", error);
    }
  };

  useEffect(() => {
    submitAnswers('print("Hello, World!")', []);
  }, []);

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      // Display results or submit answers using JDoodle's REST API
      submitAnswers();
    }
  };

  const handleAnswerSave = (answer) => {
    setUserAnswers(() => {
      console.log("anser", answer);
      const tempAnswers = [...userAnswers];
      tempAnswers.splice(currentProblemIndex, 1, answer);
      console.log("tempAnswer", tempAnswers);
      return tempAnswers;
    });
    setCurrentProblemIndex(currentProblemIndex + 1);
  };
  return (
    <>
      <Problem problem={problems[currentProblemIndex]} />
      <button onClick={handleNextProblem}>Next Problem</button>
      <button
        onClick={() => submitAnswers(userAnswers[0], problems[0]?.testCases)}
      >
        Submit
      </button>
      <Editor onSave={handleAnswerSave} />
      <Result userAnswers={userAnswers} problems={problems} />
    </>
  );
};

export default App;
