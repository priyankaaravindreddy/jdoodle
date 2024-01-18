// Editor.js
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './editor.css'

const Editor = ({
  code = '', handleCodeChange,
}) => {

  return (
    <div className="editorContainer">
      <MonacoEditor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleCodeChange}
        theme="vs-light"
      />
    </div>
  );
};

export default Editor;
