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

      });
    
});