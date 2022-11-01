const { Router } = require('express');
const mysql = require('mysql');

const router = Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'betball',
    password: 'pass',
    database: 'Name'
})

router.use((req, res, next) => {
    console.log('Request made to /USERS ROUTE');
    next();
});

router.get('/', async (req, res) => {
    //const results = await db.promise.query('SELECT * FROM USERS');
    //console.log(results);
    res.send(200);
});

router.get('/posts', (req, res) => {
    res.json({ route: 'Posts' });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            db.promise().query(`INSERT INTO USERS VALUES('${username}', '${password}')`);
            res.status(201).send({msg: 'Created User'});
        } catch (err) {
            console.log(err);
        }
        
    }
})

