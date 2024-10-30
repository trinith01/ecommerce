const fs = require('fs');
const path = require('path');
const cloudinary = require('./cloudinary');
const connection = require('./dbconnection');

(async function uploadImages() {
  try {
    const imageDir = path.join(__dirname, 'images');
    const files = fs.readdirSync(imageDir);  // Read all files from the 'images' folder

    for (let file of files) {
      const variantId = path.parse(file).name;  // Use the filename as variant_id

    console.log(`Uploading: ${file} (Variant ID: ${variantId})`);


    const uploadResult = await cloudinary.uploader.upload(
        path.join(imageDir, file),
        {
            public_id: `ecommerce/${variantId}`,
            transformation: [
                { width: 450, height: 350, crop: 'fit' }, // Resize without cropping
              ],
        }

    );

      console.log(`Uploaded to Cloudinary: ${uploadResult.secure_url}`);

      // Insert into MySQL database
      const [result] = await connection.query(
        'INSERT INTO product_image (variant_id, image_url) VALUES (?, ?)',
        [variantId, uploadResult.secure_url]
      );

      console.log(`Inserted into DB with ID: ${result.insertId}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();  // Close MySQL connection pool
  }
})();
