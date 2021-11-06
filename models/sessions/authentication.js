const bcrypt = require ("bcrypt");
const database = require ("../database");


/**
 * @class  class for authenicating users
 * @param {username} username username to be hashed
 * @param {password} password password of client to be hashed
 * @param {saltrounds} number number of salt rounds
 */
class  Authentication {
    constructor(username,password) {
        this.username = username;
        this.password = password;
        this.rounds = 12;
    }

    hashUsername = async function() {
        let salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(this.username,salt);
        return await hashed;
    }

    hashPassword = async function() {
        let salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(this.password,salt);
        return await hashed;
    }

    saveLoginDetails = async function(data) {
       if(typeof data == "object") {
           const {access,edit,deleteitem,register} = data;
           this.hashPassword()
           .then ( (hash) =>  {
               database.query(`INSERT INTO STAFFLOGINS (USERNAME,PASSWORD,FULLACCESS,DELETITEM,EDIT,FAILEDATTEMPT,REGISTER)
               VALUES("${this.username}","${hash}","${access}","${deleteitem}","${edit}","${0}","${register}")`,
               (err,results,fields) => {
                   if(err) throw err;
                   return results;
               })
           }).catch( (err) => { throw (err)})
       } else {
           return `${data} is not an object`;
       }
    }
    failedAttempt = async function () {

    }
    hasUsername =  function() {
        let query = `SELECT * FROM stafflogins WHERE USERNAME = "${this.username}"`;
        return new Promise( function( resolve,reject) {
            database.query(query, (err,results,fields) => {
                if(err) {
                    reject(err);
                } else {
                   resolve(results.length)
                }
            })
        })
    }
    comparePassword = async function() {
        let hashusername = this.hashUsername();
        let queryString = `SELECT PASSWORD FROM STAFFLOGINS WHERE USERNAME = ${hashusername}`;
        database.query(queryString, (err,results,fields)  => {
            if(err) throw err;
            if(results) {
                let password = results["PASSWORD"];
                bcrypt.compare(this.password, password, function(err, result) {
                   console.log(results);
                });  
            }
        })
     
    }



}

module.exports = Authentication;


