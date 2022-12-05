const { Router } = require('express');
const mysql = require('mysql');

const router = Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'betball_database'
})

const testQuery = "SELECT * FROM bets;"

/*
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
            //db.promise().query(`INSERT INTO USERS VALUES('${username}', '${password}')`);
            //res.status(201).send({msg: 'Created User'});
            document.getElementById('create-account').addEventListener(() => {
                const username = document.getElementById('username').textContent;
                const email = document.getElementById('email').textContent;
                const pass = document.getElementById('pass').textContent;
                const phone = document.getElementById('phone').textContent;
                const balance = 100;
            
                try {
                    db.promise().query(`INSERT INTO USER VALUES('${username}', '${pass}', '${email}', '${phone}', '${balance}')`);
                } catch (err) {
                    console.log(err);
                }
            });

            document.getElementById('place').addEventListener(() => {

                const bet_id = 0001;
                const amount = document.getElementById('amount').textContent;
                const description = 'Warriors vs. Heat';
                const time = '7:30';
                const payout = 2 * amount;
                const username = 'TestUser';
                const game_id = '0001';
                const placed_odds = '+100';
            
                try {
                    db.promise().query(`INSERT INTO BETS VALUES('${bet_id}', '${amount}', '${description}', '${time}', '${payout}', '${username}', '${game_id}', '${placed_odds}')`);
                } catch (err) {
                    console.log(err);
                }
            });


        } catch (err) {
            console.log(err);
        }
        
    }
});

document.getElementById('login').addEventListener(() => {

});
*/

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query(testQuery, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
  });
