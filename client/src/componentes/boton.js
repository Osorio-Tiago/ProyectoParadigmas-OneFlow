import React, {useEffect,useState } from 'react';
import '../App.css';


function Button({id, setCodeData}) {
  const [data, setData] = useState(""); // Estado para almacenar datos
  const [code, setCode] = useState("");

  
  const handleLoadData = () => {
   
    fetch(`/script/'${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(loadedData => {
        setCodeData(loadedData);
      })
      .catch(error => {
        console.error("Error al cargar datos:", error);
      });
  };


  const handleSaveData = () => {
   
    const dataToSave = { id: "4", texto: "Tercer objeto con ID 4." };
    fetch('/script/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
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

  const handleCompiler = () => {
      const codeToCompile = code; 
      fetch('/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: codeToCompile })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(compilationResult => {
          setData(compilationResult.result);
        })
        .catch(error => {
          console.error("Error al compilar:", error);
        });
    };
    //window.location.href = '/';


  return (
    <div className='Button'>
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <button onClick={handleCompiler}>Compilar</button>

      <button>Ejecutar</button>
      <button>Limpiar</button>
      <div>{data && <p>Datos cargados: {data.texto}</p>}</div>
      {/* Asegúrate de mostrar la propiedad correcta del objeto data */}
    </div>
  );
}

export default Button;
