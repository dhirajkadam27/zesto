import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    basePrice: { unit: 'kg', value: '' },
    types: [],
  });
  const [type, setType] = useState({ typeName: '', price: { unit: 'kg', value: '' } });

  const fetchCategories = async () => {
    const response = await axios.get(process.env.REACT_APP_URL+'/api/categories');
    setCategories(response.data);
  };

  const fetchProducts = async (categoryId) => {
    const response = await axios.get(process.env.REACT_APP_URL+`/api/products/${categoryId}`);
    setProducts(response.data);
  };

  const addType = () => {
    setNewProduct((prev) => ({
      ...prev,
      types: [...prev.types, type],
    }));
    setType({ typeName: '', price: { unit: 'kg', value: '' } });
  };

  const addProduct = async () => {
    if (!newProduct.basePrice.value && newProduct.types.length === 0) {
      alert('Please provide either a base price or at least one type with price.');
      return;
    }

    await axios.post(process.env.REACT_APP_URL+'/api/products', newProduct);
    setNewProduct({ name: '', category: '', basePrice: { unit: 'kg', value: '' }, types: [] });
    fetchProducts(newProduct.category);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Product Management</h2>
      <select
        onChange={(e) =>
          setNewProduct((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Product Name"
      />
      <h4>Base Price</h4>
      <input
        type="number"
        value={newProduct.basePrice.value}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            basePrice: { ...prev.basePrice, value: e.target.value },
          }))
        }
        placeholder="Base Price"
      />
      <select
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            basePrice: { ...prev.basePrice, unit: e.target.value },
          }))
        }
      >
        <option value="kg">Kg</option>
        <option value="mt">Mt</option>
      </select>
      <h4>Product Types (Optional)</h4>
      <input
        type="text"
        value={type.typeName}
        onChange={(e) => setType({ ...type, typeName: e.target.value })}
        placeholder="Type Name"
      />
      <input
        type="number"
        value={type.price.value}
        onChange={(e) =>
          setType((prev) => ({
            ...prev,
            price: { ...prev.price, value: e.target.value },
          }))
        }
        placeholder="Price"
      />
      <select
        onChange={(e) =>
          setType((prev) => ({
            ...prev,
            price: { ...prev.price, unit: e.target.value },
          }))
        }
      >
        <option value="kg">Kg</option>
        <option value="mt">Mt</option>
      </select>
      <button onClick={addType}>Add Type</button>
      <ul>
        {newProduct.types.map((t, index) => (
          <li key={index}>
            {t.typeName} - {t.price.value} {t.price.unit}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
      <h3>Products</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - 
            {prod.basePrice?.value
              ? `${prod.basePrice.value} ${prod.basePrice.unit}`
              : prod.types.map(
                  (t) => `${t.typeName}: ${t.price.value} ${t.price.unit}`
                )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
