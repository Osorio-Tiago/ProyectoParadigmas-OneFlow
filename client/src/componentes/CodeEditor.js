import React, { useEffect, useState } from 'react';
import TextAreaWithLineCounter from  './textAreaPrueba';
let keywords = [];


const CodeEditor = ({codeData, setCode, outputData, setConsoleOutput, inputData, handleChangeInput, ConsoleData}) => {

  useEffect(() => {
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
    }, []);

  const [matching_keywords, setMatching_keywords] = useState([]);
  const [lineCount, setLineCount] = useState(1); 
  const [wordCount, setWordCount] = useState(0);  


  const clearCode = () => {
    setCode('');
    setConsoleOutput('');
    setConsoleOutput('');
    setLineCount(1); // Restablece el contador de líneas
    setWordCount(0); // Restablece el contador de palabras
  };


  const autoComplete = (word) => {
    const filteredWords = keywords.filter((keyword) => keyword.includes(word));

    if (filteredWords.length > 0) {
      const newCode = eliminarUltimaPalabra(codeData) + " " + filteredWords[0];
      setCode(newCode);
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

  return (
    <>
      {/*Input to load data by id or save new data*/}
      <div>
        <input
          type="text"
          placeholder="Guardar o Cargar archivo"
          style={{ width: '350px', display: 'block', margin: '0 auto' }}
          onChange={handleChangeInput}
          value={inputData}
        />
      </div>

       {/*Textarea EA and TA*/}
      <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex' }}>
        {/*Esto es el text area EA*/}
        <div style={{ flex: '1', paddingLeft: '20px', paddingTop: '10px', overflow: 'auto' }}>
        <TextAreaWithLineCounter text={codeData} setText={handleChange} boolRead ={false}/>
        <div style={{paddingLeft: '15px'}}>
            Líneas: {lineCount} Palabras: {wordCount}
          </div>
          </div>
        <div>
            {matching_keywords.map((word) => (
              <button onClick={() => autoComplete(word)} key={word}>
                {word}
              </button>
            ))}
          </div>
      </div>
      <div style={{ display: 'flex' }}>
        {/*Esto es el text area TA*/}
      <TextAreaWithLineCounter text={outputData} setText={setConsoleOutput} boolRead ={true}/>
      </div> 
      </div>




      
      <div>
         {/*Esto es el text area RA*/}
        <textarea
          value={ConsoleData}
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
    </>
  );
}

export default CodeEditor;


