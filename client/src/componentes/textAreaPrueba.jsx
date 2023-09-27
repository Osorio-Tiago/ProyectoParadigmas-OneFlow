import React, { useState, useEffect } from 'react';

function TextAreaWithLineCounter({text, setText}) {

  const [lines, setLines] = useState([]);


const handleChangeText = ({target : {value}}) => {
  setText(text)
}

  // Función para dividir el texto en líneas
  const splitTextIntoLines = (text) => {
    //return codeDatas.split('\n');
    if (text) {
      return text.split('\n');
    } else {
      return [1];
    }
  };

  useEffect(() => {
    // Actualiza las líneas cuando cambia el texto
    setLines(splitTextIntoLines(text));
  }, [text]); //Every time text changes useEffect is called

  const lineCounterStyle = {
    fontSize: '12px', // Ajusta el tamaño de fuente aquí
    color: 'white',
    borderRight: '1px solid #ccc',
    paddingRight: '4px',
    flex: '0 0 auto'
  };


  return (
  <div style={{ display: 'flex' ,overflowY: 'scroll' }}>
    <div style={lineCounterStyle}>
      {lines.map((line, index) => (
        <div key={index}
          style={{
          textAlign: 'right',
          paddingRight: '5px',
          color: '#fff',
        }}>
          {index + 1}
        </div>
      ))}
    </div>
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
      <textarea 
        fontSize="1rem"
        value={text}
        onChange={setText}
        rows={10}
        cols={40}
        
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          overflowY: 'visible',
          resize: 'none'
        }}
      />
    </div>
  </div>
);  
}

export default TextAreaWithLineCounter;