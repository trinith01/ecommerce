const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const featuredProductRoutes = require('./routes/featuredproducts');
const cartRouterPost = require('./routes/cartpost');
const cartRouterGet = require('./routes/cartget');
const categories = require('./routes/categories');
const payment = require('./routes/payment');
const uploadRoutes = require('./routes/upload');
const profile=require('./routes/profile')
// const guest =require('./routes/guest')

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files for product images
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/api', authRoutes);
app.use('/api', categories);
app.use('/api', featuredProductRoutes);
app.use('/api', cartRouterPost);
app.use('/api', cartRouterGet);
app.use('/api', payment);
app.use('/api', uploadRoutes); // Image upload route
// app.use('/api', guest);
app.use('/api',profile);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
