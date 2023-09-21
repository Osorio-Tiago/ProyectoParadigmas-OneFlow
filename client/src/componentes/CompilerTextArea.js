import React, { useState} from 'react';
import '../App.css';


function CompilerTextArea() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const compileCode = () => {
    try {
      const compiledResult = eval(code);
      setResult(compiledResult.toString());
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Editor de Código</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Escribe tu código aquí..."
      ></textarea>
      <button onClick={compileCode}>Compilar</button>
      <h2>Resultado:</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default CompilerTextArea;