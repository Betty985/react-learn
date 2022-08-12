import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router   } from "react-router-dom";
import React from "react";
import App from "./app";
const container = document.getElementById('root');
const root = createRoot(container); 
root.render( 
  <Router>
     <App />
   </Router >
);
