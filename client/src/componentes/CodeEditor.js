import React, { useState, useRef, useEffect } from 'react';

const keywords = [
  "HTML",
  "javascript",
  "Node.js",
  "php",
  "java"
];

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [matching_keywords, setMatching_keywords] = useState([]);
  const textAreaRef = useRef(null);
  const lineNumberRef = useRef(null);

  function autoComplete(word) {
    const newCode = eliminarUltimaPalabra(code) + " " + word;
    setCode(newCode);
  }

  const handleChange = ({ target: { value } }) => {
    setCode(value);
    const matches = keywords.filter((word) => word.includes(obtenerUltimaPalabra(value)));

    if (obtenerUltimaPalabra(value.trim()) === "") {
      setMatching_keywords([]);
    } else {
      setMatching_keywords(matches);
    }
  };

  useEffect(() => {
    // Actualizar la posición del contador de números al cambiar el contenido del textarea
    lineNumberRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
  }, [code]);

  function obtenerUltimaPalabra(texto) {
    const palabras = texto.split(' ');
    return palabras.length >= 2 ? palabras[palabras.length - 1] : texto;
  }

  const eliminarUltimaPalabra = (texto) => {
    const palabras = texto.split(' ');
    return palabras.length >= 2 ? palabras.slice(0, -1).join(' ') : '';
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Presionar Enter agrega una nueva línea, por lo que podemos contar las líneas en el código
      const lineCount = code.split('\n').length;
      // Actualizar el contador de números al agregar una nueva línea
      lineNumberRef.current.style.height = `${lineCount * 20}px`;
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop = lineCount * 20;
    }
  };

  const runCode = () => {
    try {
      const result = Function('"use strict";return (' + code + ')')();
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  // Define el estilo para el textarea y el contador de números
  const textareaStyle = {
    width: '100%',
    minWidth: '400px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: '10px',
    boxSizing: 'border-box',
    flexGrow: 1,
    whiteSpace: 'pre-wrap',
    overflowY: 'scroll',
    maxHeight: '400px',
    fontFamily: 'monospace', // Tipo de fuente para ambos elementos
    fontSize: '14px', // Tamaño de letra para ambos elementos
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto', padding: '10px', borderRight: '1px solid #ccc' }}>
          <div
            ref={lineNumberRef}
            style={{
              textAlign: 'right',
              paddingRight: '5px',
              color: '#fff',
              width: '2em',
              whiteSpace: 'pre-wrap',
            }}
          >
            {code.split('\n').map((line, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <textarea
            ref={textAreaRef}
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={textareaStyle}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '10px',
            }}
          >
            <button onClick={runCode}>Ejecutar</button>
            <button onClick={clearCode}>Limpiar</button>
          </div>
        </div>
        <div style={{ flex: '1', padding: '10px' }}>
          <div>
            <h2>Resultado:</h2>
            <pre style={{ height: '400px' }}>{output}</pre>
          </div>
          <div>
            {matching_keywords.map((word) => (
              <button onClick={() => { autoComplete(word) }} key={word}>{word}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
