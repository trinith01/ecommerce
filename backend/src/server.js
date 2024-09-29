const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import routes
const featuredProductRoutes=require('./routes/featuredproducts')
const cartRouterPost = require('./routes/cartpost');
const cartRouterGet=require("./routes/cartget")
const categories=require('./routes/categories')
const payment=require("./routes/payment")
const db = require('./dbconnection');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api', authRoutes);
app.use('/api',categories)
app.use('/api',featuredProductRoutes);
app.use('/api', cartRouterPost);
app.use('/api',cartRouterGet)
app.use('/api',payment)


// app.get('/api/products', async (req, res) => {
//   try {
//     const [results] = await db.query('SELECT * FROM products'); // Use promise query
//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).send(err);
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
