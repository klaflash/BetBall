let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

$(function () {

    
    db.transaction(function (transaction) {
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

                let card = document.createElement("div");
                card.classList.add("card");

                // let gameID = document.createTextNode('Game ID : ' + row.game_ID);
                // card.appendChild(gameID);

                let div1 = document.createElement("div");
                let desc = document.createTextNode("Teams "  +  " odds" + "\n");
                div1.appendChild(desc);
                card.appendChild(div1);

                let div2 = document.createElement("div");
                let team1Text = document.createTextNode(row.team1 + ': ' + row.team1_odds);
                div2.appendChild(team1Text);
                card.appendChild(div2);

                let div3 = document.createElement("div");
                let team2Text = document.createTextNode(row.team2 + ': ' + row.team2_odds);
                div3.appendChild(team2Text);
                card.appendChild(div3);

                let cardList = document.querySelector("#cardsList");
                cardList.appendChild(card);
                
                }
            } 
            },
            function (transaction, err) {
            alert(err.message);
            }
        );
    })
});
