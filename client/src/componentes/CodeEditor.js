import React, { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(''); // Estado para almacenar la salida del código

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const runCode = () => {
    try {
      // Utiliza una función anónima para evaluar el código y capturar la salida
      const result = Function('"use strict";return (' + code + ')')();
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 auto', padding: '10px', borderRight: '1px solid #ccc' }}>
        {code.split('\n').map((line, index) => (
          <div
            key={index}
            style={{
              textAlign: 'right',
              paddingRight: '5px',
              color: '#fff', // Cambiar el color del texto a blanco
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div style={{ flex: '1', padding: '10px', overflow: 'auto' }}>
        <textarea
          value={code}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '10px', // Agregar relleno al área de texto
            boxSizing: 'border-box', // Incluir el relleno en las dimensiones
          }}
        />
        <button onClick={runCode}>Ejecutar</button>
      </div>
      <div style={{ flex: '1', padding: '10px' }}>
        <div>
          <h2>Resultado:</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;