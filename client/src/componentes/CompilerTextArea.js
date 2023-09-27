import React, { useState} from 'react';
import '../App.css';


function CompilerTextArea() { 
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Escribe tu código aquí..."
      ></textarea>
      <h2>Resultado:</h2>
      <pre>{result}</pre>
    </div>
  );

  
  }

export default CompilerTextArea;