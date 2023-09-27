import React, {useEffect, useState } from 'react'
import './App.css';
import Button from './componentes/buttons/boton';
import CodeEditor from './componentes/CodeEditor';
import BtonAboutUs from './componentes/buttons/btonAboutUs';

function App() {

const [code, setCode] = useState(''); // create the hook for negotiate local data for code an then set when to use
const [output, setOutput] = useState(''); // create the hook for output and set the data when to use
const [consoleOutput, setConsoleOutput] = useState(''); // this hook realize the use for console to output and set when to use
const [inputId, setInputId] = useState(''); // is use the hook when have input the data

const [lineCountOutput, setLineCountOutput] = useState(1); // hook is use for store the output count the  lines iniatialice in 1
const [wordCountOutput, setWordCountOutput] = useState(0);  // hook is use for count the output words the lines initalice in 0
const [lineCount, setLineCount] = useState(1); // hook is use for store the count the lines iniatialice in 1
const [wordCount, setWordCount] = useState(0);  // hook is use for count the words the lines initalice in 0

// This function handle the change in the value the output line 
const handleLineCountOutputChange = ({target : {value}}) =>{
  setLineCountOutput(value)
}

// This function handle the value of output word
const handleWordCountOutputChange = ({target : {value}}) =>{
  setWordCountOutput(value)
}

// This function handle of value the count line 
const handleLineCountChange = ({target : {value}}) =>{
  setLineCount(value)
}

// handle the change of value in the count word 
const handleWordCounChange = ({target : {value}}) =>{
  setWordCount(value)
}

// This function set the code for handle the change of code
const handleCodeChange = (text) => {
  setCode(text)
}

// This funtion set the input id for handle change this value  
const handleInputChange = ({target : {value}}) => {
  setInputId(value)
}

// The function set for handle the change the text 
const handleOutputChange = (text) => {
  setOutput(text)
}

// handle the set output for execute the code 
const handleEval = (text) => {
  setConsoleOutput(text)
}

return (
  <div className="App">
    <BtonAboutUs/>

  <div className='botones'> 
    <Button id = {inputId} setCodeData = {handleCodeChange} 
                          codeData = {code} outputData = {output} setOutputData = {handleOutputChange} 
                          setEval = {handleEval} setIdData = {handleInputChange}
                          setLinesCount ={handleLineCountChange} 
                          setWordCount = {handleWordCounChange} 
                          setLinesCountOutput = {handleLineCountOutputChange}  
                          setWordCountOutput = {handleWordCountOutputChange} 
                          /></div>

    <div className='StyleC'>
      <CodeEditor codeData = {code} setCode={handleCodeChange}  outputData={output} 
                setConsoleOutput={handleOutputChange} inputData = {inputId} 
                handleChangeInput = {handleInputChange} ConsoleData = {consoleOutput}
                lineCountOutput = {lineCountOutput} wordCountOutput = {wordCountOutput}
                setLineCountOutput = {handleLineCountOutputChange} setWordCountOutput = {handleWordCountOutputChange}
                wordCount={wordCount} setLineCount={handleLineCountChange} setWordCount={handleWordCounChange}

      />
    </div>
  </div>
);

}

export default App;
