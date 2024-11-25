import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./workspaces/Proyecto_pagina_web/mi-tienda/src/pages/Home.js";
import ProductPage from "/workspaces/Proyecto_pagina_web/mi-tienda/src/pages/ProductPage.js"; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/product/:id" element={<ProductPage />} /> {}
      </Routes>
    </Router>
  );
};

export default App;
