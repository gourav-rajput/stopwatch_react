import React, { Component } from "react";
import StopWatch from "./components";

require("./style.css");

class App extends Component {
  constructor(props){
    super(props);
  }
  

  render() {
    return (
      <StopWatch />
    );
  }
}

export default App;
