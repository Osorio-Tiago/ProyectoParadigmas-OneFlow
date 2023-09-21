import React, { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const codeLines = code.split('\n');

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 auto', padding: '10px', borderRight: '1px solid #ccc' }}>
        {codeLines.map((line, index) => (
          <div key={index} style={{ textAlign: 'right', paddingRight: '5px', color: '#999' }}>
            {index + 1}
          </div>
        ))}
      </div>
      <div style={{ flex: '1', padding: '10px' }}>
        <textarea
          value={code}
          onChange={handleChange}
          style={{ width: '100%', height: '100%', border: 'none', outline: 'none', resize: 'none' }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;