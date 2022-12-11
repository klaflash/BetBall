let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

var amountVal;
var payout;
var oddsVal;
var game_ID; 

$(function () {
    
    
    
    db.transaction(function (transaction) {
        const odds = 'SELECT * FROM Odds';
        transaction.executeSql(
            odds,
            undefined,
            function (transaction2, result) {
            if (result.rows.length) {
                for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows.item(i);
                game_ID = row.game_ID;
                const team1 = row.team1;
                const team2 = row.team2;
                const team1_odds = row.team1_odds;
                const team2_odds = row.team2_odds;

                let card = document.createElement("div");
                card.id = "card" + i;
                card.classList.add("card");
                

                // let gameID = document.createTextNode('Game ID : ' + row.game_ID);
                // card.appendChild(gameID);

                let div1 = document.createElement("div");
                let desc = document.createTextNode("Teams "  +  " odds" + "\n");
                div1.appendChild(desc);
                div1.classList.add("line");
                card.appendChild(div1);

                let div2 = document.createElement("div");
                let team1Text = document.createTextNode(row.team1 + ': ' + row.team1_odds);
                div2.appendChild(team1Text);
                div2.classList.add("line");
                card.appendChild(div2);

                let div3 = document.createElement("div");
                let team2Text = document.createTextNode(row.team2 + ': ' + row.team2_odds);
                div3.appendChild(team2Text);                
                div3.classList.add("line");
                card.appendChild(div3);

                let cardList = document.querySelector("#cardsList");
                cardList.appendChild(card);
                document.getElementById("card" + i).onclick = function(){
                    
                    let modal = document.createElement("form");
                    modal.classList.add("modal");
                    let container = document.createElement("div");

                    let br = document.createElement("br");

                    let radio1 = document.createElement("input");
                    radio1.setAttribute("type", "radio");
                    radio1.setAttribute("name", "team");
                    radio1.setAttribute("value", "team-one");
                    let lbl1 = document.createElement("label");
                    let teamName1 = document.createTextNode(team1 + " : ");
                    let odds1 = document.createTextNode(team1_odds);
                    lbl1.appendChild(teamName1);
                    lbl1.appendChild(odds1);
                    container.appendChild(radio1);
                    container.appendChild(lbl1);
                    container.appendChild(document.createElement("br"));

                    let radio2 = document.createElement("input");
                    radio2.setAttribute("type", "radio");
                    radio2.setAttribute("name", "team");
                    radio2.setAttribute("value", "team-two");
                    let lbl2 = document.createElement("label");
                    lbl2.innerHTML = team2 + " : " + team2_odds;
                    container.appendChild(radio2);
                    container.appendChild(lbl2);
                    container.appendChild(document.createElement("br"));

                    let amount = document.createElement("input");
                    amount.setAttribute("type", "number");
                    amount.setAttribute("name", "amount");
                    amount.setAttribute("id", "amount");
                    let lbl = document.createElement("label");
                    amount.appendChild(lbl);
                    container.appendChild(amount);
                    container.appendChild(document.createElement("br"));

                    let submit = document.createElement("button");
                    submit.setAttribute("id", "place");
                    submit.setAttribute("type", "submit");
                    submit.innerHTML = "Place";
    
                    container.appendChild(submit);

                    modal.appendChild(container);
                    modal.style.display = "block";

                    cardList.append(modal);

                    document.getElementById("place").onclick = function(){
                        
                        oddsVal = 0;
                        var options = document.getElementsByName("team");
                        if(options[0].checked){
                            oddsVal = team1_odds;
                        } else{
                            oddsVal = team2_odds;
                        }
              
                        let amountVal = document.getElementById("amount").value;
                        let payout = oddsVal/100 * amountVal;
                        
                        modal.style.display = "none";

                        db.transaction(function (transaction) {
        
                            const bets = 'SELECT * FROM BETS';
                            transaction.executeSql(
                                bets,
                                undefined,
                                function (transaction, result) {
                                    console.log(result);
                                    createBet(transaction, amountVal,"ln", payout, "Admin", game_ID, oddsVal);
                                },
                            function (transaction, err) {
                            //alert(err.message);
                            });
                        
                        });
                        //createBet(transaction, amountVal,"", payout, "Admin", game_ID, oddsVal);
                    }
                }
                }
            } 
        },
        function (transaction, err) {
        alert(err.message);
        });
    })
    // db.transaction(function (transaction) {
    //     const BETS = 'SELECT * FROM BETS';
    //     transaction.executeSql(
    //         BETS,
    //         undefined,
    //         function (transaction, result) {
    //             betId = result.rows.length + 1;
    //         }
    //     )
    // });
    

function createBet(transaction, amount, description, payout, username, game_ID, placed_odds) {
    const sql =
      'INSERT INTO BETS(amount, description, payout, username, game_ID, placed_odds) VALUES(?,?,?,?,?,?)';
    transaction.executeSql(
      sql,
      [amount, description, payout, username, game_ID, placed_odds],
      function () {
        //alert('New item is added successfully');
      },
      function (transaction, err) {
        alert(err.message);
      }
    )
};
  
});
