import React, { useState } from 'react';

function BtonAboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Change the value and control when show or hide the modal 
  const [jsonData, setJsonData] = useState(null); // This state it use for store and negotiate Json data components

  //This function is use to GET json data to the server for take 
  //data from 'about'
  const fetchJsonData = () => {
    fetch('http://localhost:3001/about')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Close the modal interfaz 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const aboutUsData = (students) => {
    // List with all the students names
    const names = students.map((student) => student.nombre);
  
    // All the common data just to don´t show it repeated
    const commonData = `Equipo: ${students[0].equipo}, Curso: ${students[0].curso}, Proyecto: ${students[0].proyecto},\nSemestre: ${students[0].semestre}, Año: ${students[0].anio}, Escuela: ${students[0].escuela}, Universidad: ${students[0].universidad}.`;
  
    // We concatenate student names and common data
    return `Estudiantes: ${names.join(', ')}.\n${commonData}`;
  };
  return (
    <div>
      <button onClick={fetchJsonData}>About us</button>
      {/*This is the about and close button**/}
      {isModalOpen && (        
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Cerrar</button>
            <pre style={{ color: 'white', fontSize: '16.5px' }}>{aboutUsData(jsonData.estudiantes)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default BtonAboutUs;
