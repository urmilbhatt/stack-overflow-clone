import React from "react";
import ReactDOM from "react-dom";

import QuestionList from "./components/QuestionList";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Stack Overflow Task</h1>
      <QuestionList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
