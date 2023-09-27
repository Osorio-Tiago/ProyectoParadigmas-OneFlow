import React, {useEffect,useState } from 'react';
import '../../App.css';
import { API_SERVER_URL } from '../Url';

function Button({id, codeData ,setCodeData, outputData, setOutputData, setEval, setIdData, setLinesCount, setWordCount, setLinesCountOutput, setWordCountOutput}) {
  const [data, setData] = useState(''); // State to store data
  const [errorMsg, setErrorMsg] = useState('')//State to store error messages
  const [hideState, setHidden] = useState(true)//Controls whether to hide or show an error message
  const [hiddenStateSuccess, setHiddenSuccess] = useState(true)//Controls whether to hide or show an success message
  const [hiddenStateSuccessMsg, setHiddenSuccessMsg] = useState('Se guardaron los datos con éxito!')//Controls whether to hide or show an success message



  
//Load data. Make an HTTP request using fetch to load data from the server
  const handleLoadData = () => { 

    if(!id){
      setErrorMsg('Debe introducir el nombre del archivo para cargar archivo')
      setHidden(false)
    }else{
      setHidden(true)
      setErrorMsg('')
    fetch(`${API_SERVER_URL}/script/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response}`);
        }
        return response.json(); 
      })
      .then(loadedData => {
        loadedData.texto = loadedData.texto.replace(/\\n/g, '\n');
      setCodeData(loadedData.texto);
      setData(loadedData.id)

      const lines = loadedData.texto.split('\n').length;
      const words = loadedData.texto.split(/\s+/).filter((word) => word !== '').length;
  
      setLinesCount({target : {value : lines}})
      setWordCount({target : {value : words}});

      })
      .catch(error => {
        setErrorMsg('No se encontró el archivo que se desea cargar')
        setHidden(false)

        console.error("Error al cargar datos:", error);
      });
  };
}


//Save the data and make an HTTP POST request if there are values to
//a server/script for svae data that give in id and codeData
  const handleSaveData = () => {
    if(!id || !codeData){
      setErrorMsg('Se deben completar los campos de nombre de archivo y el contenido del archivo para guardar los datos')
      setHidden(false)
    }else {
      setHidden(true)
      setErrorMsg('')
    
    fetch(`${API_SERVER_URL}/script/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'texto': codeData
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log("Respuesta del servidor:", responseData);
        setHiddenSuccess(false)
      })
      .catch(error => {
     console.error("Error al enviar datos al servidor:", error);
      });
  };
}



//Compilation function. If codeData is not empty
//then make an HTTP POST request to compile the code given in codeData

  const handleCompiler = () => {

    if(!codeData){
      setErrorMsg('Se debe completar el campo para compilar archivo')
      setHidden(false)
    }
    else{
      setHidden(true)
      setErrorMsg('')

      fetch(`${API_SERVER_URL}/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: codeData })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(compilationResult => {
          compilationResult.result = compilationResult.result.replace(/\n/g, '\r\n');
          setOutputData(compilationResult.result);

          const lines = compilationResult.result.split('\n').length;
          const words = compilationResult.result.split(/\s+/).filter((word) => word !== '').length;
      
          setLinesCountOutput({target : {value : lines}})
          setWordCountOutput({target : {value : words}});
        })
        .catch(error => {
          console.error("Error al compilar:", error);
        });
    };
    
}
 
//Eval function this have a POST 
//request to the server for execute the code
  const handleEval = () => {
    if(!codeData){
      setErrorMsg('Se debe completar los campos para ejecutar el archivo')
      setHidden(false)
    }
    else{
      setHidden(true)
      setErrorMsg('')

    fetch(`${API_SERVER_URL}/eval`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: outputData })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(evalResult => {
        console.log(evalResult)
        setEval(evalResult);
      })
      .catch(error => {
        console.error("Error al compilar:", error);
      });
    }
  }

// Is responsible for clearing or resetting various 
// states and values in the application
  const handleClearAll = () => {
    setCodeData('')
    setOutputData('')
    setEval('')
    setData('')
    setIdData({target : {value : ''}})
    setLinesCount({target : {value : 1}})
    setWordCount({target : {value : 0}})
    setLinesCountOutput({target : {value : 1}})
    setWordCountOutput({target : {value : 0}})
    setHidden(true)
    setErrorMsg('')
    setHiddenSuccess(true)
  } 
    

//Returns the buttons with the respective functions of load, save, compile, run and clean.
//Has a status if the id being used does not match and displays an error message
  return (
    <div >
    <div className='Button'>
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <button onClick={handleCompiler}>Compilar</button>

      <button onClick={handleEval}>Ejecutar</button>
      <button onClick={handleClearAll}>Limpiar</button>
      <div>{data && <p>Datos cargados: {data}</p>}</div>
    </div>
 <p hidden = {hideState} id="LoadDataerror" style={{ color: 'red'}}>{errorMsg}</p>
 <p hidden = {hiddenStateSuccess} style={{color : '#7FFF00'}}>{hiddenStateSuccessMsg}</p>
    </div>
  );
}

export default Button;
