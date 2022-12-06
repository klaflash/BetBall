let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

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
        alert('User table created sucessfully');
      },
      function () {
        alert('User table is already created');
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
      const sql = "INSERT INTO USER(username, email, password, phone, balance) VALUES(?,?,?,?,?)";
      transaction.executeSql(
        sql,
        [username, pass, email, phone, balance],
        function () {
          alert('New item is added successfully');
        },
        function (transaction, err) {
          alert(err.message);
        }
      );
    });
  });
  
  $('#list').click(function() {
    $('#item-list').children().remove();
    db.transaction(function(transaction) {
        const sql = "SELECT * FROM User";
        transaction.executeSql(sql, undefined, function(transaction, result) {
            if (result.rows.length) {
                for (let i = 0; i < result.rows.length; i++) {
                    const row = result.rows.item(i);
                    const username = row.username;
                    const password = row.password;
                    const email = row.email;
                    const phone = row.phone;
                    const balance = row.balance;
                    $('#item-list').append('<tr><td>' + username + '</td><td>' + password + '</td><td>' + email + '</td><td>' + phone + '</td><td>' + balance + '</td></td>');
                }
            } else {
                $('#item-list').append('<tr><td colspan="6" align="center">No item found</td></tr>');
            }
        }, function(transaction, err) {
            alert(err.message);
        })
    })
  });
  
});

