const express = require("express");
const connection = require("../db");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.route("/referers")
.all( function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "OK";
    next();
})
.get( function(request,response){
    const sql = "SELECT * FROM REFERER";
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results);
    })
})
.post( function(request,response){
    const {institution, referer,shortcode} = request.body;
    const sql = `INSERT INTO REFERER (INSTITUTION,SHORTCODE,REFERER) VALUES("${institution}","${shortcode}","${referer}")`;
    connection.query(sql, function(err,result,fields){
        if(err) throw err;
        response.send(result);
    })
})
.delete( function(request,response){
    const {id} = request.body;
    if(id != 0 || undefined || null){
        const sql = `DELETE FROM REFERER WHERE ID = "${id}"`;
        connection.query(sql, function(err,results,fields){
            if(err) throw err;
            response.send(results);
        })
    }
})
.put (function(request,response){
    const {referer,institution,shortcode,id} = request.body;
    const sql = `UPDATE REFERER SET REFERER = "${referer}" ,INSTITUTION = '${institution}',SHORTCODE = '${shortcode}' WHERE ID = "${id}"`;
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results)
    })
})


module.exports = router;