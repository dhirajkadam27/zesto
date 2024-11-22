import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/categories');
    setCategories(response.data);
  };

  const addCategory = async () => {
    await axios.post('http://localhost:5000/api/categories', { name: newCategory });
    setNewCategory('');
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category Management</h2>
      <div>
        <TextField
          label="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={addCategory} variant="contained">
          Add
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryManagement;
