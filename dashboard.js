//const {db, user} = require('./login.js')

//transfer.db - test it out in another page

let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

let username = localStorage.getItem("username");

$(function () {
    $('#welcome').text(`Welcome to your account ${username}, your current balance is 0`)
});

//document.getElementById('welcome').innerHTML = `Welcome to your account ${username}, your current balance is 0`;

$(function () {

    db.transaction(function () {

          $('#view-reports').click(function () {

            window.location.href = 'reports.html';

        });

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





      });
});