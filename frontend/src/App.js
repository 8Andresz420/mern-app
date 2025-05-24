import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Tareas from './components/Tareas';

function App() {
  return (
    <Router>
      <div className="p-4 max-w-3xl mx-auto">
        <nav className="mb-6 flex space-x-6">
          <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
          <Link to="/tareas" className="text-blue-600 hover:underline">Tareas</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tareas" element={<Tareas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
