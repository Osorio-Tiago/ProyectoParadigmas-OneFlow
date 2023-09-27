import React, {useEffect, useState } from 'react'
//import './App.css';
import Button from './componentes/boton';
import CodeEditor from './componentes/CodeEditor';
import BtonAboutUs from './componentes/btonAboutUs';
import TextAreaWithLineCounter from  './componentes/textAreaPrueba';
function App() {

  /*
  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => {
      setBackendData(data);
    });
  }, []);
*/
/////////////////////////////////////////////////////////////////////////////

const [code, setCode] = useState('');
const [output, setOutput] = useState('');
const [consoleOutput, setConsoleOutput] = useState('');
const [inputId, setInputId] = useState('');

const handleCodeChange = (text) => {
  setCode(text)
}

const handleInputChange = ({target : {value}}) => {
  setInputId(value)
}

const handleOutputChange = (text) => {
  setOutput(text)
}

const handleEval = (text) => {
  setConsoleOutput(text)
}

return (
  <div className="App">
    <BtonAboutUs/>

  <div className='botones'> 
    <Button id = {inputId} setCodeData = {handleCodeChange} codeData = {code} outputData = {output} setOutputData = {handleOutputChange} setEval = {handleEval}/></div>

    <div className='StyleC'>
      <CodeEditor codeData = {code} setCode={handleCodeChange}  outputData={output} 
                setConsoleOutput={handleOutputChange} inputData = {inputId} 
                handleChangeInput = {handleInputChange} ConsoleData = {consoleOutput}
      />
    </div>
  </div>
);

}

export default App;
