const bcrypt = require ("bcrypt");
import SonosoftDatabase  from "../database";


/**
 * @class  class for authenicating users
 * @param {username} username username to be hashed
 * @param {password} password password of client to be hashed
 * @param {saltrounds} number number of salt rounds
 */
class  Authentication {
    constructor(username,password,saltrounds) {
        this.username = username;
        this.password = password;
        this.rounds = saltrounds;
    }

    validateUsername = async function() {
       
    }
}


const hashName = new Authentication("username","password",12);


console.log(SonosoftDatabase)
