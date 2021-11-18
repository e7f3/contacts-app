import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Wrapper from "./components/Wrapper.jsx";
import AppRouter from "./components/AppRouter.jsx";
import Header from "./components/Header.jsx";
import "./styles/styles.less";

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <AppRouter />
      </Wrapper>
    </Router>
  );
}

export default App;
