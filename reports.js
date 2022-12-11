let db = openDatabase('itemDB', '1.0', 'Betball', 5000);
let teams = []

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

            /*
            $('#ranking-list').append(
                '<tr><td>' +
                  username +
                  '</td><td>' +
                  balance +
                  '</td></td>'
              );*/
          }
        } else {
          $('#item-list').append(
            '<tr><td colspan="6" align="center">No item found</td></tr>'
          );
          /*$('#ranking-list').append(
            '<tr><td colspan="3" align="center">No item found</td></tr>'
          );*/
        }
      },
      function (transaction, err) {
        alert(err.message);
      }
    );

  });


  db.transaction(function (transaction) {
    const bar = localStorage.getItem("leaderboardSort");
    const leaderboard = 'SELECT * FROM Leaderboard ORDER BY balance ' + bar;

    transaction.executeSql(
      leaderboard,
      undefined,
      function (transaction, result) {
        if (result.rows.length) {
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            const username = row.username;
            const balance = row.balance;

            $('#ranking-list').append(
              '<tr><td>' +
              username +
              '</td><td>' +
              balance +
              '</td></td>'
            );
          }
        } else {
          $('#ranking-list').append(
            '<tr><td colspan="6" align="center">No item found</td></tr>'
          );
        }

        //alert("Added values to leaderboard");
      },
      function (transaction, err) {
        alert(err.message);
      }
    );
  });


  db.transaction(function (transaction) {

    const foobar = localStorage.getItem("oddsFilter");

    if (foobar == "All teams") {
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
    }
    else {
      const teams_sql = 'SELECT * FROM Odds WHERE team1 == \'' + foobar + '\' OR team2 == \'' + foobar + '\'';

      transaction.executeSql(
        teams_sql,
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
    }
  });


    db.transaction(function (transaction) {
    const teams_sql = 'SELECT * FROM Odds';
            transaction.executeSql(
              teams_sql,
              undefined,
              function (transaction, result) {
                if (result.rows.length) {
                  $('#team-sort').append('<option>All teams</option>');
                  for (let i = 0; i < result.rows.length; i++) {
                    const row = result.rows.item(i);
                    const team1 = row.team1;
                    const team2 = row.team2;
                    teams.push(team1)
                    teams.push(team2)
                  }
                  let uniqueTeams = Array.from([...new Set(teams)].values())
                  for (names of uniqueTeams.values()) {
                    $('#team-sort').append(`<option value="${names}">${names}</option>`)
                  }
                } else {
                  $('#team-sort').append('<option>No teams</option>');
                }
              },
              function (transaction, err) {
                alert(err.message);
              }
            );
    });


  $('#dashboard').click(function () {
    db.transaction(function (transaction) {
      window.location.href = 'Home.html';
    });
  });

  $('#sort').click(function () {
    db.transaction(function (transaction) {
      $('#ranking-list').children().remove();

      let foo = localStorage.getItem("leaderboardSort");

      if (foo == "DESC") {
        localStorage.setItem("leaderboardSort", "ASC");
      }
      else {
        localStorage.setItem("leaderboardSort", "DESC");
      }

    });
  });

  $('#filter').click(function () {
    db.transaction(function (transaction) {

      const team = $('#team-sort').val();
      localStorage.setItem("oddsFilter", team);

      /*
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

              if (team1 === team || team2 === team) {

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
      );*/
    })
  });


});
