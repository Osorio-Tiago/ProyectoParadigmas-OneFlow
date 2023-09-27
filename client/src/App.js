import React, {useEffect, useState } from 'react'
import './App.css';
import Button from './componentes/boton';
import CodeEditor from './componentes/CodeEditor';
import CompilerTextArea from './componentes/CompilerTextArea';


function App() {

  // Example using fetch from data in server
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => {
      setBackendData(data);
    });
  }, []);

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



return (
  <div className="App">
    {typeof backendData.users === 'undefined' ? (
      <p>Loading data from server...</p>
    ) : (
      backendData.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))
    )}
 
  <div className='botones'> 
    <Button id = {inputId} setCodeData = {handleCodeChange}/></div>

    <div className='StyleC'>
      <CodeEditor codeData = {code} setCode={handleCodeChange}  setOutput={output} 
                setConsoleOutput={consoleOutput} inputData = {inputId} 
                handleChangeInput = {handleInputChange}
      />
    </div>
  </div>
);

}

export default App;
