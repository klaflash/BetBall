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

            const odds = 'SELECT * FROM Odds';
            transaction.executeSql(
              odds,
              undefined,
              function (transaction, result) {
                if (result.rows.length) {
                  for (let i = 0; i < result.rows.length; i++) {
                    const row = result.rows.item(i);
                    const game_ID = row.game_ID;
                    const team1 = row.team1;
                    const team2 = row.team2;
                    const team1_odds = row.team1_odds;
                    const team2_odds = row.team2_odds;
                    $('#odds-list').append(
                      '<tr><td>' +
                        game_ID +
                        '</td><td>' +
                        team1 +
                        '</td><td>' +
                        team2 +
                        '</td><td>' +
                        team1_odds +
                        '</td><td>' +
                        team2_odds +
                        '</td></td>'
                    );
                  }
                } else {
                  $('#odds-list').append(
                    '<tr><td colspan="6" align="center">No item found</td></tr>'
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