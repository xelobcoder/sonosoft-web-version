const bcrypt = require ("bcrypt");
const SonosoftDatabase  = require ("../database");
const connection = require("../db");
const database = new SonosoftDatabase();

const config = {
    SECRET : "BLOWCATJONESONOSOFTVERSION0.0.1PRODUCTIONBYTIIFUHAMZA",
    SECURE: false,
  }

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
    
    roleIdentification = function (username) {
       let query = `SELECT ROLE FROM STAFFLOGINS WHERE USERNAME = "${username}"`;
        return new Promise(function(resolve, reject){
            connection.query (query,function(err,results,fields) {
                if(err) {
                    reject (err);
                }
                resolve(results[0]["ROLE"])
            })
        })
    }
    landingPage = async function (param,response) {
        let role = {
           sonographer : "/sonoqueue",
           customer_services_attendant: "/index",
           management:"/finance"
        }
      
        if(role.hasOwnProperty(param)) {
            let page = role[`${param}`];
            response.cookie("connectid",config.SECRET)
            response.send({landingpage: page})
        } else {
            console.log(`${param} not found`)
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
    comparePassword = async function(param) {
        let queryString = `SELECT PASSWORD FROM STAFFLOGINS WHERE USERNAME = "${this.username}"`;
        return new Promise(function(resolve,reject){
            connection.query(queryString, (err,results,fields)  => {
                if(err) {
                    reject(err)
                };
                if(results.length == 1) {
                   let comparer = async function (password,hash){
                    bcrypt.compare(password, hash, function(err, result) {
                        if(err) throw err;
                        resolve(result)
                   }); 
                   }
                   setTimeout( function(){
                    comparer(param,results[0]["PASSWORD"])
                   },200)
                } else {
                   console.log(`password for such username not found`);
                }
            })
        })
     
    }

    // send all privileges of signed in individual to front end to determine action
    performAction = async (response,username,tablename) => {  
        const query = `SELECT * from ${tablename} WHERE USERNAME = "${username}"`;
        connection.query( query, function(err,results,fields) {
            if(err) throw err;
            response.send(results);
        })
    }



}

module.exports = Authentication;


