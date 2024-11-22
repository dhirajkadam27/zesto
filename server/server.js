const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://user:2710@zesto.2kk1x.mongodb.net/?retryWrites=true&w=majority&appName=Zesto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
