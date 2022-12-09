let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

$(function () {


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
                    $('#users-list').append(
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

                    $('#ranking-list').append(
                        '<tr><td>' +
                          username +
                          '</td><td>' +
                          balance +
                          '</td></td>'
                      );
                  }
                } else {
                  $('#item-list').append(
                    '<tr><td colspan="6" align="center">No item found</td></tr>'
                  );
                  $('#ranking-list').append(
                    '<tr><td colspan="3" align="center">No item found</td></tr>'
                  );
                }
              },
              function (transaction, err) {
                alert(err.message);
              }
            );


        $('#dashboard').click(function () {
            window.location.href = 'dashboard.html';
        });

    });

});