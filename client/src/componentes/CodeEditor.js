import React, { useEffect, useState } from 'react';

let keywords = [];

fetch("/keywords")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener las palabras clave");
    }
    return response.json();
  })
  .then((data) => {
    keywords = data.palabrasReservadas; // Set keywords array with info returned by fetch from api
  })
  .catch((error) => {
    console.error(error);
  });

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [matching_keywords, setMatching_keywords] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [lineCount, setLineCount] = useState(1); 
  const [wordCount, setWordCount] = useState(0); 

  const [isDataLoaded, setDataLoaded] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const autoComplete = (word) => {
    const filteredWords = matching_keywords.filter((keyword) => keyword.includes(word));

    if (filteredWords.length > 0) {
      const newCode = eliminarUltimaPalabra(code) + " " + filteredWords[0];
      setCode(newCode);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setCode(value);
    const inputWord = obtenerUltimaPalabra(value.trim());

    // Contar líneas y palabras
    const lines = value.split('\n').length;
    const words = value.split(/\s+/).filter((word) => word !== '').length;

    setLineCount(lines);
    setWordCount(words);

    if (inputWord === "") {
      setMatching_keywords([]);
    } else {
    
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
      setConsoleOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setConsoleOutput(`Error: ${error.message}`);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
    setConsoleOutput('');
    setLineCount(1); // Restablece el contador de líneas
    setWordCount(0); // Restablece el contador de palabras
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const loadData = () => {
    // Lógica para cargar datos
    // Puedes agregar la lógica para cargar datos aquí
    // Por ejemplo, hacer una solicitud fetch a una API o cargar datos de un archivo.
    console.log(`Cargando datos para el término de búsqueda: ${searchTerm}`);
  };

  const saveData = () => {
    // Lógica para guardar datos
    // Puedes agregar la lógica para guardar datos aquí
    // Por ejemplo, enviar datos a un servidor o guardar en el navegador.
    console.log(`Guardando datos para el término de búsqueda: ${searchTerm}`);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar o cargar archivo"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '350px', display: 'block', margin: '0 auto' }}
        />
      </div>
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
              width: '350px',
              height: '400px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              padding: '10px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
            }}
          />
          <button onClick={runCode}>Ejecutar</button>
          <button onClick={clearCode}>Limpiar</button>
          <div>
            Líneas: {lineCount} Palabras: {wordCount}
          </div>
        </div>
        <div style={{ flex: '1', padding: '10px' }}>
          <div>
            <textarea
              value={output}
              readOnly
              style={{
                width: '350px',
                height: '400px',
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '10px',
                boxSizing: 'border-box',
                overflowX: 'scroll',
              }}
            />
          </div>
          <div>
            {matching_keywords.map((word) => (
              <button onClick={() => autoComplete(word)} key={word}>
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <textarea
          value={consoleOutput}
          readOnly
          style={{
            width: '700px',
            height: '200px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '10px',
            boxSizing: 'border-box',
            overflowX: 'scroll',
            marginTop: '20px',
          }}
        />
      </div>
      <div>
        <button onClick={isDataLoaded ? saveData : loadData} style={{ display: 'block', margin: '0 auto' }}>
          {isDataLoaded ? 'Guardar Datos' : 'Cargar Datos'}
        </button>
      </div>
    </>
  );
}

export default CodeEditor;


