import React, { useState, useEffect } from 'react';



function App() {
  const [data, setData] = useState(""); // Estado para almacenar datos

  const handleLoadData = () => {
    // Lógica para cargar datos (puedes reemplazar esto con tu lógica real)
    const loadedData = "Cargar";
    setData(loadedData);
  };

  const handleSaveData = () => {
    // Lógica para guardar datos (puedes reemplazar esto con tu lógica real)
    const dataToSave = "Guardar";
    // Aquí puedes enviar los datos al servidor o realizar cualquier acción de guardado
    console.log("Datos guardados:", dataToSave);
  };

  return (
    <div>
      <h1>Botones de Cargar y Guardar</h1>
      <button onClick={handleLoadData}>Cargar Datos</button>
      <button onClick={handleSaveData}>Guardar Datos</button>
      <div>{data && <p>Datos cargados: {data}</p>}</div>
    </div>
  );
}

export default App;
