import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { getPosts, addPost } from './API/Data';

function App() {
  const [Data,setData] = useState("");
  const [cMessage,setMessage] = useState("");

  useEffect(() => {
    setData("Loading...");
    getPosts(setData);
  }, []);
  
  function getInput(e:any){
    setMessage(e.target.value);
  }

  function sendMessage(){
    if(cMessage == "") return;
    addPost(cMessage);
    setMessage("");
  }

  return (
    <div className="App">
      <div id="TXT">{Data}</div>
      <input onChange={getInput} type="text" value={cMessage} id='MSG' placeholder='Message'></input>
      <button onClick={sendMessage} id="SEND">Send</button>
    </div>
  )
}

export default App
