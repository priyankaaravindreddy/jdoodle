// Editor.js
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleTestCode = () => {
     console.log('Testing code:', code);
  };

  return (
    <div>
      <h2>Code Editor</h2>
      <MonacoEditor
        height="600vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleCodeChange}
      />
      <button onClick={handleTestCode}>Test Code</button>
    </div>
  );
};

export default Editor;
