let db = openDatabase('itemDB', '1.0', 'Betball', 5000);
let user;

document.getElementById('page-one').style.display = "none";

$(function () {
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

  $('#create-account').click(function () {
    const username = $('#username').val();
    const email = $('#email').val();
    const pass = $('#pass').val();
    const phone = $('#phone').val();
    const balance = 0;

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
            }
          } else {
            createAccount(transaction, username, email, pass, phone, balance);
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
                //alert('Sucessfull login')
                user = username;
                window.location.href = 'dashboard.html';
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

function createAccount(transaction, username, email, pass, phone, balance) {
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

//console.log(typeof exports === "object")
//module.exports = {db, user};
