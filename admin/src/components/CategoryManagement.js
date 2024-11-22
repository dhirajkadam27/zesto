import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    const response = await axios.get(process.env.REACT_APP_URL+'/api/categories');
    setCategories(response.data);
  };

  const addCategory = async () => {
    await axios.post(process.env.REACT_APP_URL+'/api/categories', { name: newCategory });
    setNewCategory('');
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category Management</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category Name"
      />
      <button onClick={addCategory}>Add Category</button>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
