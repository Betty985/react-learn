import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Profiler } from "react";
import {
  Clock,
  Todo,
  TabsComponent,
  LoginControl,
  ModalControl,
  TickTock,
  Input,
  MouseTracker,
  ScrollingList,
  ErrorBoundary,
} from "./Components";
import { onRenderCallback } from "./tools";
import { useMouse } from "./hooks/useMouse";
let container = document.getElementById("container");

function Tabs(props) {
  const [tab, setTab] = React.useState("时间");
  const items = [
    { name: "时间", ele: <Clock /> },
    { name: "用户", ele: <LoginControl /> },
    {
      name: "待办",
      ele: (
        <ScrollingList>
          <Todo />
        </ScrollingList>
      ),
    },
    { name: "弹窗", ele: <ModalControl container={container} /> },
    { name: "计时", ele: <TickTock /> },
    { name: "输入框", ele: <Input /> },
    { name: "鼠标", ele: <MouseTracker /> },
  ];
  function handleTabSelect(tab) {
    setTab(tab);
  }
  return (
    <>
      <TabsComponent
        onChange={() => handleTabSelect(tab)}
        items={items}
        defaultActiveKey="时间"
        state={props.state}
      />
    </>
  );
}

function App() {
  let { mouse,  MouseContext } = useMouse();
  // console.log('app', mouse)
  return (
    <ErrorBoundary>
      <div className="App">
        <MouseContext.Provider value={mouse}>
          <header className="App-header">
            <Profiler id="tabs" onRender={onRenderCallback}>
              <Tabs />
            </Profiler>
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
        </MouseContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
