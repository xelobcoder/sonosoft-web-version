const bcrypt = require ("bcrypt");
const SonosoftDatabase  = require ("../database");
const connection = require("../db");
const database = new SonosoftDatabase();

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

    landingPage = async function (param,request) {
        let role = {
           sonographer : "sonoqueue",
           customer_service_attendant: "registration",
           management:"dashboard"
        }

        if(role.hasOwnProperty(param)) {
            request.render(`${role[param]}`);
        } else {
            return;
        }
        
    }

    saveLoginDetails = async function(data,response) { 
       if(typeof data == "object") {
           const {fullaccess,edit,deleteitem,register,role} = data;
           database.matchColumnText("USERNAME",this.username,"stafflogins")
           .then( (res) => {
               if(res.length == 0) {
                this.hashPassword()
                .then ( (hash) =>  {
                    connection.query(`INSERT INTO STAFFLOGINS (USERNAME,PASSWORD,FULLACCESS,DELETITEM,EDIT,FAILEDATTEMPT,REGISTER,ROLE)
                    VALUES("${this.username}","${hash}","${fullaccess}","${deleteitem}","${edit}","${0}","${register}","${role}")`,
                    (err,results,fields) => {
                        if(err) throw err;
                        response.send({message: "insertion successful"});
                    })
                }).catch( (err) => { throw (err)})
               } else {
                   response.send({
                       message: "username found in database",
                       action : "try using fullname or call on admin"
                   })
               }
           }).catch ( (err) => {throw err})
       } else {
           return `${data} is not an object`;
       }
    }
    failedAttempt = async function () {

    }
    hasUsername =  function() {
        let query = `SELECT * FROM stafflogins WHERE USERNAME = "${this.username}"`;
        return new Promise( function( resolve,reject) {
            connection.query(query, (err,results,fields) => {
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
        return new Promise(function(resolve,reject){
            connection.query(queryString, (err,results,fields)  => {
                if(err) {
                    reject(err)
                };
                if(results) {
                    let password = results["PASSWORD"];
                    bcrypt.compare(this.password, password, function(err, result) {
                       resolve(result)
                    });  
                }
            })
        })
     
    }



}

module.exports = Authentication;


