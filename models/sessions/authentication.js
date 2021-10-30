const bcrypt = require ("bcrypt");


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

    hashUsername = async function() {
        let salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(this.username,salt);
        return await hashed;
    }

    hashPassword = async function() {
        let salt = await bcrypt.gen();
        let hashed = await bcrypt.hash(this.password,salt);
        return await hashed;
    }

    
}

const connection = new Authentication("username","password",12);


