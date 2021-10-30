const connection = require("./database");

    /**
     * @param {number} cost  represent the cost of the scan
     * @param {number} amountpaid represent amount paid for the scan
     * @param {number} discount represent discount if given else discount = 0
     */
    let paymentAmount = function(a,b,d = 0){
        if(d == 0 && a > b){
            let d = a-b;
            return {
                deficit: d,
                message : `${d} top required`
             }
        }
        if( d != 0 && b > a && d < b){
            let realamount = a - d;
            return {
                required: realamount,
                excess:( function(){
                    return b - a;
                })(),
                message: `refund required`
            }
        }
        if( d == 0 && b > a){
            let excess = b - a;
            return {
                refund: excess,
                message: `refund of ${excess} required`
            }
        }
        return b-a;

    }


    const typeValidator = function(item,type){
        return typeof(item) == type ? true : false;
    }


   /**
    * @param {number} id  ID of the client to be deleted from the table
    * @param {string} name Name of the table to be deleted
    */

    let deleteID = function(id,name){
        const isNumber = typeValidator(id,"number");
        const isString = typeValidator(name,"string");

        if(isNumber && isString){
            const query = `DELETE FROM ${name} WHERE ID = ${id}`;
            connection.query( query, function(err,results,fields){
                if(err) {
                    throw err;
                }
                return results;
            })
        }else{
            return "required types needed";
        }
   }

    // DRY for get responses
   let GetAll = function(request,response,table){
    /**
    * @param {string} table name of the table for GET request;
    * 
    */
    let get = function(){
       let query = `SELECT * FROM ${table}`;
       connection.query( query, function(err,results,fields){
           if(err) throw err;
           response.send(results);
       })
   }
   get();

}


  /**
   * 
   * @param {id} id transactional id of client which is unique for each client
   * @param {panel} panel panel to seach if id is already present
   * @return  a promise 
   * 
   */
    // return a promis
   const isExist = async function(id,panel){
        let query = `SELECT * FROM ${panel} WHERE ID = "${id}"`;
        return (
            new Promise( function(resolve, reject){
                connection.query(query,(err,results,fields) => {
                    if(err) throw err;
                    if(results.length > 0 ) {
                        reject(1);
                    } else {
                        resolve(0);
                    }
                })
            })
        )
   }

