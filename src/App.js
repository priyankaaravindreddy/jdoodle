// App.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Problem from "./components/Problem";
import Editor from "./components/Editor";
import Result from "./components/Result";
import "./App.css";
import { questions } from "./sample-questions";

const App = () => {
  const [problems, setProblems] = useState([...questions]);
  const [results, setResults] = useState("");
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(undefined));
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const submitAnswers = async () => {
    const apiEndpoint = "http://localhost:3001/execute";

    try {
      const response = await axios.post(apiEndpoint, {
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "186d3ff06d71925162ea140679478958f95d3349333a3fc9585eaaa18eb0c5a3",
        useAnswers: userAnswers,
        problems: problems,
        language: "php",
        versionIndex: 0,
      });

      const apiResults = response.data;
      console.log(apiResults);
    } catch (error) {
      console.error("Error calling JDoodle API:", error);
    }
  };

  const [code, setCode] = useState("");
  const [socketClient, setSocketClient] = useState(undefined);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  const onWsConnection = useCallback(() => {
    console.log("I am connected");
    console.log("connection succeeded");

    socketClient.subscribe("/user/queue/execute-i", (message) => {
      console.log("message ", message);
      let msgId = message.headers["message-id"];
      let msgSeq = parseInt(msgId.substring(msgId.lastIndexOf("-") + 1));

      let statusCode = parseInt(message.headers.statusCode);

      if (statusCode === 201 || statusCode === 200) {
        setResults(JSON.stringify(message));
        // this.wsNextId = msgSeq + 1;
        return;
      }

      let t0;
      try {
        t0 = performance.now();
        while (performance.now() - t0 < 2500 && this.wsNextId !== msgSeq) {}
      } catch (e) {}

      if (statusCode === 204) {
        //executionTime = message.body
      } else if (statusCode === 500 || statusCode === 410) {
        //server error
        console.log("server error");
      } else if (statusCode === 206) {
        //outputFiles = JSON.parse(message.body)
        //returns file list - not supported in this custom api
      } else if (statusCode === 429) {
        //Daily limit reached
        console.log("daily limit reached");
      } else if (statusCode === 400) {
        //Invalid request - invalid signature or token expired - check the body for details
        console.log("invalid request - invalid signature or token expired");
      } else if (statusCode === 401) {
        //Unauthorised request
        console.log("Unauthorised request");
      } else {
        console.log(statusCode);
      }

      // this.wsNextId = msgSeq + 1;
    });
  }, [socketClient]);

  const onWsConnectionFailed = useCallback(() => {
    console.log("I am not connected");
  }, []);

  useEffect(() => {
    // Set up the WebSocket client without connecting
    const client = window.webstomp.over(
      new window.SockJS("https://api.jdoodle.com/v1/stomp"),
      { heartbeat: false, debug: true }
    );
    setSocketClient(client);

    // Cleanup function to disconnect when the component is unmounted
    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    console.log("socketclient ", socketClient);
    if (socketClient && !socketClient.connected) {
      // Connect to the WebSocket server only if not already connected
      socketClient.connect({}, onWsConnection, onWsConnectionFailed);
    }

    // Cleanup function to disconnect when the component is unmounted
    return () => {
      if (socketClient && socketClient.connected) {
        socketClient.disconnect();
      }
    };
  }, [onWsConnection, onWsConnectionFailed, socketClient]);

  useEffect(() => {
    setCode("");
  }, [userAnswers]);

  const handleAnswerSave = () => {
    setUserAnswers((prevAnswers) => {
      console.log("anser ", code, currentProblemIndex);
      const tempAnswers = [...prevAnswers];
      tempAnswers.splice(currentProblemIndex, 1, code);
      console.log("tempAnswer", tempAnswers);
      return tempAnswers;
    });
  };
  const handleNextProblem = () => {
    handleAnswerSave();
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  const handlePreviousProblem = () => {
    handleAnswerSave();
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  const handleTestCode = async () => {
    const apiEndpoint = "http://localhost:3001/auth-token";

    try {
      const response = await axios.post(apiEndpoint, {
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "fb579404de6f715b013255b59c671e9cc65ecbc09fb0f963b93c5c6e5e7f518a",
      });

      const apiResults = response;
      let data = JSON.stringify({
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "fb579404de6f715b013255b59c671e9cc65ecbc09fb0f963b93c5c6e5e7f518a",
        language: "php",
        // script: 'echo "Enter a string: ";$inputString = rtrim(fgets(STDIN), "\n"); $reversedString = strrev($inputString); echo "Original String: $inputString\n";echo "Reversed String: $reversedString\n";',
        script: `<?php ${code} ?>`,
        stdin: "[priyanka]",
        versionIndex: 0,
      });
      socketClient.send("/app/execute-ws-api-token", data, {
        message_type: "execute",
        token: apiResults.data,
      });
      console.log(apiResults);
    } catch (error) {
      console.error("Error calling JDoodle API:", error);
    }
  };
  return (
    <>
      <div className="problem">
        <Problem
          problem={problems[currentProblemIndex]}
          idx={currentProblemIndex}
        />
        <div className="problemBtns">
          <button
            className="problemPrevious"
            onClick={handlePreviousProblem}
            disabled={currentProblemIndex === 0}
          >
            Previous Problem
          </button>
          <button
            className="problemNext"
            onClick={handleNextProblem}
            disabled={currentProblemIndex === 9}
          >
            Next Problem
          </button>
          <button className="problemSubmit" onClick={() => submitAnswers()}>
            Submit
          </button>
        </div>
      </div>

      <div className="codeBox">
        <div className="codeBoxArea">
          <Editor
            userAnswer={userAnswers[currentProblemIndex]}
            currentProblemIndex={currentProblemIndex}
            handleCodeChange={handleCodeChange}
          />
          <Result results={results} />
        </div>
        {code && (
          <button type="button" onClick={handleTestCode} className="testCode">
            Test Code
          </button>
        )}
      </div>
    </>
  );
};

export default App;
