const mysql = require ("mysql");

const createConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database :"sonosoft_web_version"
})

connection = createConnection.connect( function(err){
    if(err) throw err;
    console.log("connection to database successfull");
})



module.exports = createConnection;