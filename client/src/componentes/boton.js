import React, {useEffect,useState } from 'react';
import '../App.css';


function Button({id, codeData ,setCodeData, outputData, setOutputData, setEval}) {
  const [data, setData] = useState(""); // Estado para almacenar datos
  const [errorMsg, setErrorMsg] = useState('')
  const [hideState, setHidden] = useState(true)


  const handleLoadData = () => {

    if(!id){
      setErrorMsg('Debe completar el campo de id para cargar archivo')
      setHidden(false)
    }else{
      setHidden(true)
      setErrorMsg('')
    fetch(`/script/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(loadedData => {
        console.log(loadedData)
      setCodeData(loadedData.texto);
      })
      .catch(error => {
        console.error("Error al cargar datos:", error);
      });
  };
}

  const handleSaveData = () => {
    if(!id || !codeData){
      setErrorMsg('Se debe completar el campo para guardar archivo')
      setHidden(false)
    }else {
      setHidden(true)
      setErrorMsg('')
    
    fetch(`/script/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'texto': JSON.stringify(codeData)
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
      })
      .catch(error => {
     console.error("Error al enviar datos al servidor:", error);
      });
  };
}

  const handleCompiler = () => {

    if(!codeData){
      setErrorMsg('Se debe completar el campo para compilar archivo')
      setHidden(false)
    }
    else{
      setHidden(true)
      setErrorMsg('')

      fetch('/compile', {
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
          setOutputData(compilationResult.result);
        })
        .catch(error => {
          console.error("Error al compilar:", error);
        });
    };
  
}
    
  const handleEval = () => {
    if(!codeData){
      setErrorMsg('Se debe completar los campos para ejecutar el archivo')
      setHidden(false)
    }
    else{
      setHidden(true)
      setErrorMsg('')

    fetch('/eval', {
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
    

  return (
    <div >
    <div className='Button'>
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <button onClick={handleCompiler}>Compilar</button>

      <button onClick={handleEval}>Ejecutar</button>
      <button>Limpiar</button>
      <div>{data && <p>Datos cargados: {data.texto}</p>}</div>
      {/* Asegúrate de mostrar la propiedad correcta del objeto data */}

    </div>
 <p hidden = {hideState} id="LoadDataerror" style={{ color: 'red' }}>{errorMsg}</p>
    </div>
  );
}

export default Button;
