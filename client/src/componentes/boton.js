import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function Button() {
  const [data, setData] = useState(""); // Estado para almacenar datos

  const handleLoadData = () => {
    
    axios.get('/script/3') // ruta correcta para cargar los datos
      .then(response => {
        
        const loadedData = response.data; // Suponiendo que la respuesta contiene los datos que deseas cargar
        setData(loadedData);
      })
      .catch(error => {
        // Manejar errores aquí
        console.error("Error al cargar datos:", error);
      });
  };

  const handleSaveData = () => {
    // Datos que deseas enviar al servidor
    const dataToSave = { id: 5, texto: "Tercer objeto con ID 5." };

    // Realizar una solicitud POST al servidor
    axios.post('/script/save', dataToSave)
      .then(response => {
        // Si la solicitud se realiza correctamente, aquí puedes verificar la respuesta
        console.log("Respuesta del servidor:", response.data);
      })
      .catch(error => {
        // Si hay un error en la solicitud, aquí puedes manejarlo e imprimir el mensaje de error
        console.error("Error al enviar datos al servidor:", error);
      });
  };

  const handleCompiler = () => {
    // Redirigir a otra página o realizar alguna acción de compilación
    window.location.href = '/';
  };

  return (
    <div className='Button'>
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <button onClick={handleCompiler}>Compilar</button>
      <div>{data && <p>Datos cargados: {data}</p>}</div>
      {/* Asegúrate de mostrar la propiedad correcta del objeto data */}
    </div>
  );
}

export default Button;
