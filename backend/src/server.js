const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import routes
const productRoutes = require('./routes/products');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api', authRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
