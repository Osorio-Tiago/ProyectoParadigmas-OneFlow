import React, { useState} from 'react';
import '../App.css';


function Button() {
  const [data, setData] = useState(""); // Estado para almacenar datos

  const handleLoadData = () => {
    // Lógica para cargar datos (puedes reemplazar esto con tu lógica real)
    const loadedData = "";
    setData(loadedData);
  };

  const handleSaveData = () => {
    // Lógica para guardar datos (puedes reemplazar esto con tu lógica real)
    const dataToSave = "Guardar";
    // Aquí puedes enviar los datos al servidor o realizar cualquier acción de guardado
    console.log("Datos guardados:", dataToSave);
  };


const handleCompiler = () =>{
  const compiler= "";
 //Logica para la ejecucion 
  window.location.href = '/';
};

  return (
    <div class ='Buttons'>
     
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <button onClick={handleCompiler}>Compilar</button>
      <div>{data && <p>Datos cargados: {data}</p>}</div>

    </div>
  );
}

export default Button;
