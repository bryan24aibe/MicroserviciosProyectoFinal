const connection = require('../models/db')

module.exports.login = (req, res) =>{
    const {username, password} = req.body;

    const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

    try {
        connection.query(consult, [username, password], (err, result) =>{
            if (err) {
                res.send(err);
            }

            if (result.length > 0){
                console.log(result);
                res.send('si existe');
            }else{
                console.log('Wrong user')
                res.send({message: 'Wrong user'})
            }
        })
    } catch (error) {
        
    }
}