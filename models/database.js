const mysql = require ("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database :"sonosoft_web_version"
})

connection.connect( function(err){
    if(err) throw err;
    console.log(`connection to database successful`);
})


module.exports = connection;
