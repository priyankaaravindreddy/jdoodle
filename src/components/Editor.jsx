// Editor.js
import React, { useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./editor.css";

const Editor = ({ userAnswer, handleCodeChange, currentProblemIndex }) => {
  console.log("userAnser in editor ", userAnswer, " ", currentProblemIndex);
  const editorRef = useRef(null);
  
  useEffect(() => {
    console.log("editorRef ", editorRef);
    editorRef?.current?.editor.setValue(userAnswer);
  }, [editorRef, userAnswer]);

  return (
    <div className="editorContainer">
      <MonacoEditor
        ref={editorRef}
        height="60vh"
        defaultLanguage="javascript"
        value={userAnswer}
        onChange={handleCodeChange}
        theme="vs-light"
      />
    </div>
  );
};

export default Editor;
