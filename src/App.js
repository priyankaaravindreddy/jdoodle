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

  const [code, setCode] = useState("");
  const [socketClient, setSocketClient] = useState(undefined);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  const onWsConnection = useCallback(() => {
    console.log("I am connected");
    console.log("connection succeeded");

    socketClient.subscribe("/user/queue/execute-i", (message) => {
      console.log("message ",message);
      let msgId = message.headers["message-id"];
      let msgSeq = parseInt(msgId.substring(msgId.lastIndexOf("-") + 1));

      let statusCode = parseInt(message.headers.statusCode);

      if (statusCode === 201) {
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

    //   let script = ` import java.util.Scanner;
    //  import java.util.NoSuchElementException;

    // public class MyClass {
    //  public static void main(String args[]) {
    //     Scanner scanner = new Scanner(System.in);

    //     try {
    //      System.out.println("Type a Line and enter....");
    //     String txt = scanner.nextLine();
    //     System.out.println("You have typed...");
    //     System.out.println(txt);
    //     } catch (NoSuchElementException e) {
    //         System.out.println("Type something in the Stdin box above....");
    //     }

    //   }
    // }`;

    // let data = JSON.stringify({
    //   script: script,
    //   language: "java",
    //   versionIndex: 4,
    // });
  }, [socketClient]);

  const onWsConnectionFailed = useCallback(() => {
    console.log("I am not connected");
  });

  // useEffect(() => {
  //   submitAnswers('print("Hello, World!")', []);
  // }, []);

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

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      // Display results or submit answers using JDoodle's REST API
      submitAnswers();
    }
  };

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
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

  const handleTestCode = async () => {
    const apiEndpoint = "http://localhost:3001/auth-token";

    try {
      const response = await axios.post(apiEndpoint, {
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "6e2dbb19edc0b53bbe2354fa188dcfc1b194bda2f532b6fa94237cc57d0fa94d",
      });

      const apiResults = response;
      let data = JSON.stringify({
        clientId: "c0fad38eb03eaa700c9310748610fad1",
        clientSecret:
          "6e2dbb19edc0b53bbe2354fa188dcfc1b194bda2f532b6fa94237cc57d0fa94d",
        language: "php",
        script: 'echo "Enter a string: ";$inputString = rtrim(fgets(STDIN), "\n"); $reversedString = strrev($inputString); echo "Original String: $inputString\n";echo "Reversed String: $reversedString\n";',
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
    console.log("Testing code:", code);
    // handleAnswerSave(code);
  };

  return (
    <>
      <div className="problem">
        <Problem problem={problems[currentProblemIndex]} />
        <div className="problemBtns">
          <button className="problemPrevious" onClick={handlePreviousProblem}>
            Previous Problem
          </button>
          <button className="problemNext" onClick={handleNextProblem}>
            Next Problem
          </button>
          <button
            className="problemSubmit"
            onClick={() =>
              submitAnswers(userAnswers[0], problems[0]?.testCases)
            }
          >
            Submit
          </button>
        </div>
      </div>

      <div className="codeBox">
        <div className="codeBoxArea">
          <Editor code={code} handleCodeChange={handleCodeChange} />
          <Result userAnswers={userAnswers} problems={problems} />
        </div>
        <button type="button" onClick={handleTestCode} className="testCode">
          Test Code
        </button>
      </div>
    </>
  );
};

export default App;
