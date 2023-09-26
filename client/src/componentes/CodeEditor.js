import React, { useState } from 'react';

let keywords = []

fetch("/keywords")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener las palabras clave");
    }
    return response.json();
  })
  .then((data) => {
    keywords = data.palabrasReservadas; //Set keywords array with info returned by fetch from api
  })
  .catch((error) => {
    console.error(error);
  });

function CodeEditor() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [matching_keywords, setMatching_keywords] = useState([]);


  const autoComplete = (word) => {
    const filteredWords = matching_keywords.filter(keyword => keyword.includes(word));
    
    if (filteredWords.length > 0) {
      const newCode = eliminarUltimaPalabra(code) + " " + filteredWords[0];
      setCode(newCode);
    }
  }

  const handleChange = ({ target: { value } }) => {
    setCode(value);
  
    const inputWord = obtenerUltimaPalabra(value.trim());
  
    if (inputWord === "") {
      setMatching_keywords([]);
    } else {
      // Filter keywords that start with the inputWord
      const matches = keywords.filter((word) => word.startsWith(inputWord));
      setMatching_keywords(matches);
    }
  };

  function obtenerUltimaPalabra(texto) {
    const palabras = texto.split(' ');
    return palabras.length >= 2 ? palabras[palabras.length - 1] : texto;
  }

  const eliminarUltimaPalabra = (texto) => {
    const palabras = texto.split(' ');
    return palabras.length >= 2 ? palabras.slice(0, -1).join(' ') : '';
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

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto', padding: '10px', borderRight: '1px solid #ccc' }}>
          {code.split('\n').map((line, index) => (
            <div
              key={index}
              style={{
                textAlign: 'right',
                paddingRight: '5px',
                color: '#fff',
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
              height: '400px', // Ajusta la altura como desees
              border: 'none',
              outline: 'none',
              resize: 'none',
              padding: '10px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap', // Evita el ajuste automático de líneas
              overflowX: 'auto', // Agrega barra de desplazamiento horizontal si es necesario
            }}
          />
          <button onClick={runCode}>Ejecutar</button>
          <button onClick={clearCode}>Limpiar</button>
        </div>
        <div style={{ flex: '1', padding: '10px' }}>
          <div>
            <textarea
              value={output}
              readOnly
              style={{
                width: '100%',
                height: '400px', // Ajusta la altura como desees
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '10px',
                boxSizing: 'border-box',
                overflowX: 'scroll', // Agrega barra de desplazamiento horizontal si es necesario
              }}
            />
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




