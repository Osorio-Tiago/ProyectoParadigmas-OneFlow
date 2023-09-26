import React, { useState } from 'react';


const keywords = [
  "HTML",
  "javascript",
  "Node.js",
  "php",
  "java"
]

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(''); // Estado para almacenar la salida del código
  const [matching_keywords, setMatching_keywords]= useState([]);


  function autoComplete(word){
    const newCode = eliminarUltimaPalabra(code) + " " + word; 
    setCode(newCode);
  }

  const handleChange = ({ target: { value } }) => {
    setCode(value);
    const matches = keywords.filter((word) => word.includes(obtenerUltimaPalabra(value)));
    //cadena.toLowerCase() implementar despues  
    if (obtenerUltimaPalabra(value.trim()) == ""){
      setMatching_keywords([]);
    } else {
      setMatching_keywords(matches);
    }
  };

  function obtenerUltimaPalabra(texto) {
    // Divide la cadena en palabras usando los espacios como separadores
    const palabras = texto.split(' ');
    return palabras.length >=2 ? palabras[palabras.length - 1] : texto;    
  }
 
  const eliminarUltimaPalabra = (texto) => {
    const palabras = texto.split(' ');
    return palabras.length >= 2 ? palabras.slice(0, -1).join(' ') : '';
  };

  const runCode = () => {
    try {
      // Utiliza una función anónima para evaluar el código y capturar la salida
      const result = Function('"use strict";return (' + code + ')')();
      setOutput(result);
    } catch (error) {
      setOutput(`Error:${error.message}`);
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
        <button onClick={clearCode}>Limpiar</button> {/* Botón para limpiar */}
      </div>
      <div style={{ flex: '1', padding: '10px' }}>
        <div>
          <h2>Resultado:</h2>
          <pre>{output}</pre>
        </div>
        <div>
        {matching_keywords.map((word) => (
        <button onClick={()=>{autoComplete(word)} } key={word}>{word}</button>
       ))}
</div>
      </div>
    </div>
    </>
  );
}

export default CodeEditor;


