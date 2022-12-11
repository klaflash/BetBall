let db = openDatabase('itemDB', '1.0', 'Betball', 5000);
let teams = []

$(function () {


  db.transaction(function (transaction) {
    const bar = localStorage.getItem("betSort");
    const sql = 'SELECT * FROM Bets ORDER BY payout ' + bar;
    transaction.executeSql(
      sql,
      undefined,
      function (transaction, result) {
        if (result.rows.length) {
          $('#bets-list').append(
            '<tr><th>bet_id</th><th>amount</th><th>payout</th><th>username</th></tr>'
          )
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            const bet_id = row.bet_id;
            const amount = row.amount;
            const payout = row.payout;
            const username = row.username;
            const game_ID = row.game_ID;
            const placed_odds = row.placed_odds;
            $('#bets-list').append(
              '<tr><td>' +
              bet_id +
              '</td><td>' +
              amount +
              '</td><td>' +
              payout +
              '</td><td>' +
              username +
              '</td></td>' +
              game_ID +
              '</td></td>' +
              placed_odds +
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
          $('#bets-list').append(
            '</tr>'
          );
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
          $('#ranking-list').append(
            '<tr><th>Username</th><th>Balance</th></tr>'
          )
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
          $('#ranking-list').append(
            '</tr>'
          );
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
            $('#odds-list').append(
              '<tr><th>game_id</th><th>team1</th><th>team2</th><th>team1_odds</th><th>team2_odds</th></tr>'
            )
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
            $('#odds-list').append(
              '</tr>'
            );
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
      const teams_sql = 'SELECT * FROM Odds USE INDEX (team_idx) WHERE team1 == \'' + foobar + '\' OR team2 == \'' + foobar + '\'';

      transaction.executeSql(
        teams_sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            $('#odds-list').append(
              '<tr><th>game_id</th><th>team1</th><th>team2</th><th>team1_odds</th><th>team2_odds</th></tr>'
            )
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
            $('#odds-list').append(
              '</tr>'
            );
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
                  $('#team-sort').append(
                    '<tr><th>team1</th><th>team2</th></tr>'
                  )
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
                  $('#team-sort').append(
                    '</tr>'
                  );
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

  $('#sort-teams').click(function () {
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

  $('#sort-bets').click(function () {
    db.transaction(function (transaction) {
      $('#bets-list').children().remove();

      let foo = localStorage.getItem("betSort");

      if (foo == "DESC") {
        localStorage.setItem("betSort", "ASC");
      }
      else {
        localStorage.setItem("betSort", "DESC");
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
