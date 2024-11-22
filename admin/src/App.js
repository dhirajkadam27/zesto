import React from 'react';
import CategoryManagement from './components/CategoryManagement';
import ProductManagement from './components/ProductManagement';

const App = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <CategoryManagement />
      <ProductManagement />
    </div>
  );
};

export default App;
