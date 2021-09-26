const express = require("express");
const router = express.Router();
const connection = require("./database");

router.use(express.urlencoded({extented: true}));
router.use(express.json())

router.route("/registration")
.all(function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "OK";
    next();
})
.get( (request,response) => {
   const mysqlQuery = "SELECT * FROM REGISTRATION";

   connection.query(mysqlQuery, function(err,results,fields){
         if(err) throw err;
         response.send(results)
   })
})
.post ( (request,response) => {
    const{
        fullname,
        age,
        gender,
        institution,
        referer,
        history,
        state,
        amountpaid,
        discount,
        cost  
    } = request.body;


    console.log(rquest.body);
})


module.exports = router;