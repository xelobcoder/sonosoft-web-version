const express = require("express");
const connection = require("../database");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.route("/institutions")
.all( function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "OK";
    next();
})
.get( function(request,response){
    const sql = "SELECT * FROM INSTITUTIONS";
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results);
    })
})
.post( function(request,response){
    const {institution} = request.body;
    if(institution === null || undefined){
        const sql = `INSERT INTO INSTITUTIONS (INSTITUTION)VALUE("${institution}")`;
        connection.query(sql, function(err,result,fields){
            if(err) throw err;
            response.send(result);
        })
    }
})
.delete( function(request,response){
    const {id} = request.body;
    if(id != 0 || undefined || null){
        const sql = `DELETE FROM INSTITUTIONS WHERE ID = "${id}"`;
        connection.query(sql, function(err,results,fields){
            if(err) throw err;
            response.send(results);
        })
    }
})
.put (function(request,response){
    const {institution,id} = request.body;
    const sql = `UPDATE INSTITUTIONS SET INSTITUTION = "${institution} WHERE ID = "${id}`;
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results)
    })
})

module.exports = router;