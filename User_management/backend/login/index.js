const express = require('express');
const connection = require('./dbconnection');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/hash', (req, res) => {
    bcrypt.hash("843228", 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const values = [hash];
        return res.json({ result: hash });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });

        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password error" });
                if (response) {
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Status: "Error", Error: "Wrong username or password" });
                }
            });
        } else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
