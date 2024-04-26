const {validationResult} = require("express-validator")
const conn = require("../config/dbConfig");



const createCategory = (req, res) => {
    const { name, description } = req.body;

   
    conn.query('SELECT * FROM category WHERE name = ?', [name], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        
        conn.query('INSERT INTO category (name, description) VALUES (?, ?)', [name, description], (err) => {
            if (err) {
                console.error('Error creating category:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'Category created successfully' });
        });
    });
};


const deleteCategory = (req, res) => {
    const { id } = req.params;
    console.log("ID",id);

    conn.query('DELETE FROM category WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    });
};
module.exports = { createCategory,deleteCategory};
