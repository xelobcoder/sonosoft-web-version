const createConnection = require('./db')

class SonosoftDatabase {
  constructor() {
    this.host = 'localhost'
    this.user = 'root'
    this.password = ''
    this.database = 'sonosoft_web_version'
  }
  addNewColumn = function (columnName, position, tableName, columnDefinition) {
    let afterquery = `ALTER TABLE ${tableName}
         ADD COLUMN ${columnName} ${columnDefinition} AFTER ${position};
        `

    let firstquery = `ALTER TABLE ${tableName}
        ADD COLUMN ${columnName} ${columnDefinition} first;
        `

    if (position != null && position != 'first') {
      createConnection.query(afterquery, (err, results, fields) => {
        if (err) throw err
        return results
      })
    } else if (position != null && position == 'first') {
      createConnection.query(firstquery, (err, results, field) => {
        if (err) throw err
        return results
      })
    } else {
      createConnection.query(
        `ALTER TABLE ${tableName}
            ADD COLUMN ${columnName} ${columnDefinition} `,
        (err, results, fields) => {
          if (err) throw err
          return results
        },
      )
    }
  }
  deleteUserUsingPrimaryID = function (userid, tablename) {
    const myquery = `DELETE FROM ${tablename} WHERE ID = ${userid}`
    createConnection.query(myquery, (err, results, field) => {
      if (err) throw err
      return results
    })
  }

  deleteUserUsingTransactionID = function (userid, tablename, columnName) {
    const myquery = `DELETE FROM ${tablename} WHERE ${columnName} = ${userid}`
    createConnection.query(myquery, (err, results, field) => {
      if (err) throw err
      return
    })
    let confimation = createConnection.query(
      `SELECT * FROM ${tablename} WHERE ${columnName} = ${userid}`,
      function (err, results, fields) {
        if (err) throw err
        if (results) {
          if (results.length === 0) {
            return 'deleted successfully'
          } else {
            return 'deletion failed or ID dosent exist'
          }
        }
      },
    )
    return confimation
  }
  /**
   *
   * @param {id} id id to check if exist
   * @param {columnName} columnName  name of column to search
   * @param {tableName} tablename  name of the table to search from
   * @returns
   */
  idExist = async function (id, columnName, tablename) {
    if (typeof id != 'number' && typeof columnName != 'string') {
      return
    } else  {
       return new Promise(function (resolve, reject) {
       createConnection.query(
        `SELECT * FROM ${tablename} WHERE ${columnName} = ${id}`,
        function (err, results, fields) {
          if (err) {
            reject(err)
          }
          resolve(results)
        },
      )
    })
    }
  }

  /**
   *
   * @param {string} columnName name of the column to search for need string match
   * @param {string} needed  string to match
   * @param {string} tableName  name of the table to search
   * @returns a promise of results or throw a rejection error
   */
  matchColumnText = async function (columnName, needed, tableName) {
    if (arguments.length == 3) {
      let query = `SELECT ${columnName} FROM ${tableName} WHERE ${columnName} = "${needed}"`
      return new Promise(function (resolve, reject) {
        createConnection.query(query, function (err, results, fields) {
          if (err) {
            reject(err)
          }
          if (results) {
            resolve(results)
          }
        })
      })
    } else {
      return `${arguments.length} should be equal to 3`
    }
  }
  /**
   * 
   * @param {string} tableName name of table in the database
   * @param {string} response http response
   * @param {number} limit optional row returned limit
   * @return {object}  array of sql rows
   */
  workedCases = async function(tableName,response,limit = 0) {
    let query = `SELECT TRANSACTIONID FROM ${tableName}`;
    let limitquery = `SELECT TRANSACTIONID FROM ${tableName}  LIMIT ${limit}  `;
    if(limit == 0) {
      createConnection.query(query, function(err,results,fields) {
        if(err) {
          throw err;
        } 
        response.send(results)
      })
    } else {
      createConnection.query(limitquery,function(err,results,fields) {
        if(err) throw err;
         response.send(results);
      })
    }
  }

  returnArow = async function(tableName,response,id) {
     createConnection.query(`SELECT * FROM ${tableName} WHERE TRANSACTIONID = "${id}"`,
     function(err,results,fields) {
       if(err) {
         throw err;
       }
       response.send(results);
     })
  }
  presetMsd = async function(tablename,response,request) {
    const {title,location,yolksac,ovaries,adnexa,abnormals,impression} = request.body;

    let query = `INSERT INTO ${tablename} (
       TITLE,LOCATION,YOLKSAC,OVARIES,ADNEXA,ABNORMALS,IMPRESSION
    ) VALUES ( "${title}","${location}", "${yolksac}","${ovaries}","${adnexa}","${abnormals}","${impression}")`;

    createConnection.query( query, (err,results,fields) => {
      if(err) {
        throw err;
      }
      if(results) {
        response.send({
          message: "insertion succesfull",
          tip: "click on preset to toggle between form fields and saved prests"
        })
      }
    })
  }

}

module.exports = SonosoftDatabase