const express = require("express");
const connection = require('../db')
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
.post( function(request,response,next){
    const {institution} = request.body;

    // check if such institution is already present
    const isPresent = `SELECT * FROM INSTITUTIONS WHERE INSTITUTION = "${institution}"`;

    connection.query(isPresent, function(err,results,fields){
        if(err) throw err;
        if(results.length > 0){
            response.send("institution already present");
        }else{
            next();
        }
    })
})
.post( function(request,response,next){
    const {institution,shortcode,location} = request.body;
    
    // insert data into the database
    const insertion = function(){
        if(institution != null ||institution != undefined){
            const sql = `INSERT INTO institutions (INSTITUTION,LOCATION,SHORTCODE) VALUES("${institution}","${location}","${shortcode}")`;
            connection.query(sql, function(err,result,fields){
                if(err) throw err;
                response.send("insertion successful");
            })
        }
    }

    insertion()
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
    const {institution,id,shortcode,location} = request.body;
    const sql = `UPDATE INSTITUTIONS SET INSTITUTION = "${institution}",LOCATION = "${location}",SHORTCODE = "${shortcode}" WHERE ID = "${id}"`;
    connection.query(sql, function(err,results,fields){
        if(err) throw err;
        response.send(results)
    })
})

module.exports = router;