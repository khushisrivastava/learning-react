import {useState} from 'react';
import ValidationComponent from './ValidationComponent/ValodationComponent';
import CharComponent from './CharComponent/CharComponent';
import './App.css';


function App() {
  let [input, setInput] = useState('')

  const wordCountHandeler = (event) => setInput(event.target.value);

  const deleteWordHandeler = (index) => {
    const text = input.split('');
    text.splice(index, 1);
    setInput(text.join(''));
  }
  
  return (
    <div className="App">
      <input type='text' onChange={(event) => wordCountHandeler(event)} value={input}/>
      <p>{input.length}</p>
      <ValidationComponent length={input.length}/>
      {input.split('').map((w, index) => <CharComponent 
            text={w} 
            key={index} 
            click={() => deleteWordHandeler(index)}/>)}
    </div>
  );
}

export default App;
