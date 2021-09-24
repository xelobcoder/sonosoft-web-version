const express = require("express");
const connection = require("../database");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.route("/scanpanel")
.all( function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "OK";
    next();
})
.get( function(request,response){
    const retrieveAll = function(){
        const sql = "SELECT * FROM SCAN";
        connection.query(sql, function(err,results,fields){
            if(err) throw err;
            response.send(results);
        })
    }
    retrieveAll()
})
.post( function(request,response){
    const {scanName,shortname,cost,oncallSonographer,date} = request.body;
    console.log(request.body)
    if(!(shortname && cost)){
        response.send("scan name and cost required")
    }else{
        const mysql = `INSERT INTO SCAN (SCANS,COST,SHORTNAME,SONOGRAPHER) VALUES("${scanName}","${cost}","${shortname}","${oncallSonographer}")`;
        connection.query(mysql, function(err,results,fields){
            if(err) throw err;
            response.send(results)
        })
    }
})
.delete( function(request,response){
    const {id} = request.body;
    if(id != undefined  || id != null){
        const sql = `DELETE FROM SCAN WHERE ID = "${id}"`;
        connection.query(sql, function(err,results,fields){
            if(err) throw err;
            response.send(results);
        })
    }
})
.put (function(request,response){
    const {id,scanName,shortname,cost,oncallSonographer,date} = request.body;
    const sql = `UPDATE SCAN SET SCANS = "${scanName}" ,COST = '${cost}',SONOGRAPHER = '${oncallSonographer}',SHORTNAME = '${shortname}' WHERE ID = "${id}"`;
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results)
    })
})


module.exports = router;