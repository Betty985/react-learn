import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Clock, Todo, TabsComponent, LoginControl,ModalControl } from './Components'
let container=document.getElementById('container')
function Tabs() {
  const [tab, setTab] = React.useState('1')
  const items = [
    { name: '时间', ele: <Clock /> },
    { name: '用户', ele: <LoginControl /> },
     { name: '待办', ele: <Todo /> },
     {name:'弹窗',ele:<ModalControl container={container}/>}
  ]
  function handleTabSelect(tab) {
    setTab(tab)
  }
  return (
    <>
      <TabsComponent onChange={()=>handleTabSelect(tab)} items={items} defaultActiveKey='1' />
    </>
  )
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Tabs />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
