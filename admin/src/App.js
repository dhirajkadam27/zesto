import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CategoryManagement from './components/CategoryManagement';
import ProductManagement from './components/ProductManagement';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/products" element={<ProductManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
