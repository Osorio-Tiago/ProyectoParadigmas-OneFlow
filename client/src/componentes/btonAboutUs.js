import React, { useState } from 'react';

function BtonAboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const fetchJsonData = () => {
    fetch('/about')
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

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const formatStudentData = (students) => {
    return students.map((student) => {
      return `Estudiante: ${student.nombre}, Equipo: ${student.equipo}, Curso: ${student.curso}, Proyecto: ${student.proyecto}, Semestre: ${student.semestre}, Año: ${student.anio}, Escuela: ${student.escuela}, Universidad: ${student.universidad}.`;
    }).join('\n');
  };

  return (
    <div>
      <button onClick={fetchJsonData}>About us</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Cerrar</button>
            <pre style={{ color: 'white', fontSize: '16.5px' }}>{formatStudentData(jsonData.estudiantes)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default BtonAboutUs;
