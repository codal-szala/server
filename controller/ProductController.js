const {validationResult} = require("express-validator")
const conn = require("../config/dbConfig");


const createProduct = (req, res) => {
    const { name, description, price,image, category_id } = req.body;

    
    conn.query('SELECT * FROM category WHERE id = ?', [category_id], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).json({ message: 'Internal serve error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

      
        conn.query('INSERT INTO product (name, description, price,image) VALUES (?, ?, ?, ?)', [name, description, price,image], (err, result) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).json({ message: 'Internal server' });
            }

            const productId = result.insertId;

           
            conn.query('INSERT INTO product_category (product_id, category_id) VALUES (?, ?)', [productId, category_id], (err) => {
                if (err) {
                    console.error('Error associating product with category:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(201).json({ message: 'Product created successfully' });
            });
        });
    });
};
module.exports = {createProduct}