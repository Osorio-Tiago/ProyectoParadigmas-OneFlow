import React, { useState } from 'react';
import './btonAboutUs.css'
import { API_SERVER_URL } from '../Url';

function BtonAboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Change the value and control when show or hide the modal 
  const [jsonData, setJsonData] = useState(null); // This state it use for store and negotiate Json data components

  //Get about us data from server to show it on a modal
  const fetchJsonData = () => {
    fetch(`${API_SERVER_URL}/about`)
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
    const commonData = `Equipo: ${students[0].equipo}\nCurso: ${students[0].curso}\nProyecto: ${students[0].proyecto}\nSemestre: ${students[0].semestre}\nAño: ${students[0].anio}\nEscuela: ${students[0].escuela}\nUniversidad: ${students[0].universidad}`;
  
    // We concatenate student names and common data
    return `\nEstudiantes: ${names.join(', ')}\n${commonData}`;
  };
  return (
    <div>
      <button onClick={fetchJsonData}>About us</button>
      {/*This is the about and close button**/}
      {isModalOpen && (        
        <div className="modal">
          <div className="modal-content">
            <div class="modal-header">
              <h2>About us</h2>
            </div>
            <pre style={{ color: 'black', fontSize: '16.5px' }}>{aboutUsData(jsonData.estudiantes)}</pre>
            <button class='close-button' onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default BtonAboutUs;
