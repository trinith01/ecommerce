const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './public/images/products', // Destination folder for uploads
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Unique filename
  }
});

const upload = multer({ storage: storage }).single('productImage');

// Route to handle image uploads
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send('Error uploading image');
    }
    const imagePath = `/public/images/products/${req.file.filename}`;
    res.json({
      success: true,
      message: 'File uploaded successfully!',
      filePath: imagePath, // Send the path to the image
    });
  });
});

module.exports = router;
