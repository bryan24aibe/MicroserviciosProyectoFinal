const express = require('express');
const connection = require('./dbconnection');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

app.get('/hash', (req, res) => {
    bcrypt.hash("843228", 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const values = [hash];
        return res.json({ result: hash });
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUE (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const values = [req.body.username, req.body.email, hash];
        connection.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Error query" });
            return res.json({ Status: "Success" });
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
