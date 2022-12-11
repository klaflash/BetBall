let db = openDatabase('itemDB', '1.0', 'Betball', 5000);
let user;
localStorage.setItem('leaderboardSort', 'ASC');
localStorage.setItem('oddsFilter', 'All teams');

const dict = {
}
dict['user1'] = 50;
dict.user1

$(function () {

  const testing = localStorage.getItem("oddsFilter");
  //alert("oddsFilter = " + testing);

  //Create user table
  db.transaction(function (transaction) {
    const sql =
      'CREATE TABLE User(' +
      'username VARCHAR(50),' +
      'password VARCHAR(50),' +
      'email VARCHAR(50),' +
      'phone VARCHAR(15),' +
      'balance INTEGER,' +
      'PRIMARY KEY(username))';

    transaction.executeSql(
      sql,
      undefined,
      function () {
        //alert('User table created sucessfully');
      },
      function () {
        //alert('User table is already created');
      }
    );
  });

  //Create leaderboard table
  db.transaction(function (transaction) {
    const sql =
      'CREATE TABLE Leaderboard(' +
      'username VARCHAR(50),' +
      'balance INTEGER,' +
      'PRIMARY KEY(username))';

    transaction.executeSql(
      sql,
      undefined,
      function () {
        //alert('Leaderboard table created sucessfully');
      },
      function () {
        //alert('Leaderboard table is already created');
      }
    );
  });

  //Create bets table
  db.transaction(function (transaction) {

    const bets =
    'CREATE TABLE Bets(' +
      'bet_id integer,' +
      'amount integer,' +
      'description varchar(50),' +
      'event_time datetime,' +
      'payout integer,' +
      'username VARCHAR(50),' +
      'game_ID VARCHAR(50),' +
      'placed_odds integer,' +
      'PRIMARY KEY(bet_id))';

    transaction.executeSql(
      bets,
      undefined,
      function () {
        //alert('Bets table created sucessfully');
      },
      function () {
        //alert('Bets table is already created');
      }
    );
  });


  //Create odds table
  db.transaction(function (transaction) {
    const sql =
      'CREATE TABLE Odds(' +
      'game_ID varchar(50),' +
      'team1 varchar(50),' +
      'team2 varchar(50),' +
      'team1_odds integer,' +
      'team2_odds integer,' +
      'PRIMARY KEY (game_ID))';
     

    transaction.executeSql(
      sql,
      undefined,
      function () {
        //alert('Odds table created sucessfully');
      },
      function () {
        //alert('Odds table is already created');
      }
    );

    const team1 = ['Golden State Warriors', 'San Antonio Spurs', 'Brooklyn Nets', 'LA Clippers', 'Boston Celtics', 'Utah Jazz'];
    const team2 = ['Miami Heat', 'Miami Heat', 'Indiana Pacers', 'Washington Wizards', 'Golden State Warriors', 'Denver Nuggets'];
    const team1_odds = ['+100', '+550', '+250', '-210', '-145', '+460'];
    const team2_odds = ['-120', '-800', '-320', '+175', '+122', '-650'];

    odds_arr = []

    for (let i = 0; i < team1.length; i++) {
        odds_arr.push({
            game_ID: i,
            team1: team1[i],
            team2: team2[i],
            team1_odds: team1_odds[i],
            team2_odds: team2_odds[i]
        })
    }


    for (let i = 0; i < odds_arr.length; i++) {

        db.transaction(function (transaction) {
        const query = `SELECT game_ID FROM Odds`;
        transaction.executeSql(
            query,
            undefined,
            function (transaction2, result) {
            if (result.rows.length) {
                let found = false;
                for (let i = 0; i < result.rows.length; i++) {
                if (result.rows.item(i).game_ID === i) {
                    found = true;
                }
                }

                if (found) {
                alert('game_ID already in use');
                } else {
                createOdds(transaction, i, team1[i], team2[i], team1_odds[i], team2_odds[i]);
                }
            } else {
                createOdds(transaction, i, team1[i], team2[i], team1_odds[i], team2_odds[i]);
            }
            },
            function (transaction2, err) {
            //alert(err.message);
            }
        );
        });
    }

  });

  $('#create-account').click(function () {
    const username = $('#username').val();
    const email = $('#email').val();
    const pass = $('#pass').val();
    const phone = $('#phone').val();
    const balance = 120;

    db.transaction(function (transaction) {
      const query = `SELECT username FROM User`;
      transaction.executeSql(
        query,
        undefined,
        function (transaction2, result) {
          if (result.rows.length) {
            let found = false;
            for (let i = 0; i < result.rows.length; i++) {
              if (result.rows.item(i).username === username) {
                found = true;
              }
            }

            if (found) {
              alert('Username already in use');
            } else {
              createAccount(transaction, username, email, pass, phone, balance);
              createLeaderboard(transaction, username, balance);
            }
          } else {
            createAccount(transaction, username, email, pass, phone, balance);
            createLeaderboard(transaction, username, balance);
          }
        },
        function (transaction2, err) {
          alert(err.message);
        }
      );
    });
  });

  $('#login').click(function () {
    const username = $('#login-username').val();
    const password = $('#login-pass').val();

    db.transaction(function (transaction) {
      const query = 'SELECT username, password FROM User';
      transaction.executeSql(query, undefined, function (transaction, result) {
        if (result.rows.length) {
          let foundUser = false;
          for (let i = 0; i < result.rows.length; i++) {
            if (result.rows.item(i).username === username) {
              foundUser = true;
              if (result.rows.item(i).password === password) {
                //alert('Successful login')
                user = username;
                localStorage.setItem('username', username);
                window.location.href = 'Home.html';
              } else {
                alert('incorrect password');
              }
            }
          }

          if (!foundUser) {
            alert('Username not registered');
          }
        } else {
          alert('there are no accounts registered');
        }
      });
    });
  });

  $('#list').click(function () {
    $('#item-list').children().remove();
    db.transaction(function (transaction) {
      const sql = 'SELECT * FROM User';
      transaction.executeSql(
        sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            for (let i = 0; i < result.rows.length; i++) {
              const row = result.rows.item(i);
              const username = row.username;
              const password = row.password;
              const email = row.email;
              const phone = row.phone;
              const balance = row.balance;
              $('#item-list').append(
                '<tr><td>' +
                  username +
                  '</td><td>' +
                  password +
                  '</td><td>' +
                  email +
                  '</td><td>' +
                  phone +
                  '</td><td>' +
                  balance +
                  '</td></td>'
              );
            }
          } else {
            $('#item-list').append(
              '<tr><td colspan="6" align="center">No item found</td></tr>'
            );
          }
        },
        function (transaction, err) {
          alert(err.message);
        }
      );
    });
  });
});

function createAccount(
  transaction,
  username,
  email,
  pass,
  phone,
  balance
) {
  const sql =
    'INSERT INTO USER(username, email, password, phone, balance) VALUES(?,?,?,?,?)';
  transaction.executeSql(
    sql,
    [username, email, pass, phone, balance],
    function () {
      //alert('New item is added successfully');
    },
    function (transaction, err) {
      alert(err.message);
    }
  );
}

function createOdds(
  transaction,
  game_ID,
  team1,
  team2,
  team1_odds,
  team2_odds,
) {
  const sql =
    'INSERT INTO Odds(game_ID, team1, team2, team1_odds, team2_odds) VALUES(?,?,?,?,?)';
  transaction.executeSql(
    sql,
    [game_ID, team1, team2, team1_odds, team2_odds],
    function () {
      //alert('New item is added successfully');
    },
    function (transaction, err) {
      //alert(err.message);
    }
  );
}

function createLeaderboard(
  transaction,
  username,
  balance
) {
  const sql =
    'INSERT INTO Leaderboard(username, balance) VALUES(?,?)';
  transaction.executeSql(
    sql,
    [username, balance],
    function () {
      //alert('New item is added successfully');
    },
    function (transaction, err) {
      //alert(err.message);
    }
  );
}