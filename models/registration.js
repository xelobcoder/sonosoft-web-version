const express = require("express");
const router = express.Router();
const connection = require("./db");

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
        cost,
        momoID,
        ageCategory,
        scan,
        paymentMode

    } = request.body;

    const uniqueid = Date.now();

    const mysql =  `INSERT INTO REGISTRATION(
        FULLNAME, AGE, GENDER,AGE_CATEGORY,SCAN,REFERER,INSTITUTION,
        PAYMENT_MODE,AMOUNT_PAID,DISCOUNT,STATE,TRANSACTIONID,HISTORY,COST,UUID
    ) VALUES ( 
        "${fullname}",
         "${age}", 
         "${gender}",
         "${ageCategory}",
         "${scan}",
         "${referer}",
         "${institution}",
         "${paymentMode}",
         "${amountpaid}",
         "${discount}",
         "${state}",
         "${momoID}",
         "${history}",
         "${cost}",
         "${uniqueid}"
         )`;

         connection.query( mysql, function(err,results,fields){
             if(err) throw err;
             response.send({
                 message: "insertion successfull",
                 field: results
             })
         })
})


module.exports = router;