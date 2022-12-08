//const {db, user} = require('./login.js')

//document.getElementById('welcome').innerHTML = `Welcome to your account ${user}, your current balance is 0`;

//transfer.db - test it out in another page

let db = openDatabase('itemDB', '1.0', 'Betball', 5000);

let username = localStorage.getItem("username");


$(function () {

    db.transaction(function () {

          $('#view-reports').click(function () {

            window.location.href = 'reports.html';

        });

      });
    
});