let db = openDatabase("itemDB", "1.0", "Betball", 5000);
$(function() {

  db.transaction(function(transaction) {
    const sql = "CREATE TABLE User(" +
      "username VARCHAR(50)," +
      "password VARCHAR(50)," +
      "email VARCHAR(50)," +
      "phone VARCHAR(15)," +
      "balance INTEGER," +
      "PRIMARY KEY(username))";

      transaction.executeSql(sql, undefined, function() {
        alert("User table created sucessfully")
      }, function() {
        alert("User table is already created")
      });
  })

});

$("#create-account").click(function() {
  const username = $("#username").val();
  const email = $('#email').val();
  const pass = $('#pass').val();
  const phone = $('#phone').val();
  const balance = 0;

  db.transaction(function(transaction) {

    const sql = `INSERT INTO USER VALUES('${username}', '${pass}', '${email}', '${phone}', '${balance}')`;
    transaction.executeSql(sql, [username, pass, email, phone, balance], function(){
      alert('New item is added successfully');
    }, function(transaction, err) {
      alert(err.message);
    });

  });

});
