const {validationResult} = require("express-validator")
const conn = require("../config/dbConfig");



const register = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    
    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ message: 'Internal serve' });
        }

        if (results.length > 0) {
           
            return res.status(400).json({ message: 'Email is already in use' });
        }

        
          
            conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

               
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
   
};
const login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

       
        if (password.trim() !== user.password.trim()) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    });
};
module.exports = { register,login };
