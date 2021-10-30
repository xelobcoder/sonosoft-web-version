const mysql = require("mysql");


export default class SonosoftDatabase {
    constructor(host,user,password,database){
       this.host = host;
       this.user= user;
       this.password = password;
       this.database = database;
    }

    createConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database :"sonosoft_web_version"
    })

    connection = this.createConnection.connect( function(err){
        if(err) throw err;
        console.log("connection to database successfull");
    })
    
    addNewColumn = function(columnName, position,tableName, columnDefinition) {
        let afterquery = `ALTER TABLE ${tableName}
         ADD COLUMN ${columnName} ${columnDefinition} AFTER ${position};
        `;

        let firstquery = `ALTER TABLE ${tableName}
        ADD COLUMN ${columnName} ${columnDefinition} first;
        `;

        if(position != null && position != "first") {
            this.createConnection.query(afterquery,(err,results,fields) => {
                if(err) throw err;
                return results;
            })
        } else if (position != null && position == "first") {
            this.createConnection.query ( firstquery, (err,results,field) => {
                if(err) throw err;
                return results;
            })
        } else {
            this.createConnection.query(`ALTER TABLE ${tableName}
            ADD COLUMN ${columnName} ${columnDefinition} `, (err,results,fields) => {
                if(err) throw err;
                return results;
            })
        }
    }
    deleteUserUsingPrimaryID= function (userid , tablename) {
        const myquery =  `DELETE FROM ${tablename} WHERE ID = ${userid}`;
        this.createConnection.query(myquery , (err,results,field) => {
            if(err) throw err;
            return results;
        })
    }

    deleteUserUsingTransactionID =  function (userid , tablename , columnName) {
        const myquery =  `DELETE FROM ${tablename} WHERE ${columnName} = ${userid}`;
        this.createConnection.query(myquery , (err,results,field) => {
            if(err) throw err;
            return;
        });
        let confimation =  this.createConnection.query(`SELECT * FROM ${tablename} WHERE ${columnName} = ${userid}`,
        function (err,results,fields){
            if(err) throw err;
            if(results) {
                if(results.length  === 0) {
                    return "deleted successfully";
                } else {
                    return "deletion failed or ID dosent exist";
                }
            }
        })
        return confimation;
    }
    idExist = async function (id,columnName,tablename) {
       if(typeof id != "number" && typeof (columnName) == "string") {
           return;
       } 
       return (new Promise ( function(resolve,reject) {
           this.createConnection.query(`SELECT * FROM ${tablename} WHERE ${columnName} = ${id}`,
           function(err,results,fields){
               if(err) {reject(err)};
               resolve(results);
           });

       }))
    }
}


