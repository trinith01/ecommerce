const express = require('express');

const bodyParser = require('body-parser');
// const dashboardRoutes = require('./routes/dashboard');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/auth');
const featuredProductRoutes = require('./src/routes/featuredproducts');
const cartRouterPost = require('./src/routes/cartpost');
const cartRouterGet = require('./src/routes/cartget');
const categories = require('./src/routes/categories');
const payment = require('./src/routes/payment');
const uploadRoutes = require('./src/routes/upload');
const profile=require('./src/routes/profile')
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
// app.use('/api', dashboardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
