// Editor.js
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({onSave}) => {
  const [code, setCode] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleTestCode = () => {
     console.log('Testing code:', code);
     onSave(code)
  };

  return (
    <div>
      <h2>Code Editor</h2>
      <MonacoEditor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleCodeChange}
      />
      <button onClick={handleTestCode}>Test Code And Save</button>
    </div>
  );
};

export default Editor;
