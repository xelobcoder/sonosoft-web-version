const express = require ("express");
const connection = require("../db");
const router = express.Router();

router.use(express.urlencoded({extended: true}))
router.use(express.json());

const isArray = function(array){
    if(Array.isArray(array) === false){
        return false;
    }
    return true;
}

router.route("/scanpanels/scan")
.all( function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "All";
    next();
})
.post( function(request,response){ 
   let clientInfo  = request.body;

   let MSD = function(data){
       
        const {id,location, ga,edd, ovaries,weeks,days, adnexa,abnormals, impression,yolksac} = data;
        let mysqlQuery = `INSERT INTO MSD  ( TRANSACTIONID,LOCATION,YOLKSAC,GA,EDD,OVARIES,ADNEXA,ABNORMAL_FINDINGS,IMPRESSION,WEEKS,DAYS
        ) VALUES ('${id}','${location}','${yolksac}','${ga}','${edd}','${ovaries}','${adnexa}','${abnormals}','${impression}','${weeks}','${days}')`;

        connection.query( mysqlQuery, function(err,results,fields){
            if(err) throw err;
            response.send({
                message: "insertion successful"
            })
        })
      
   }

   let ABDOMINAL = function(data){
       if(isArray(data)){
           const {liver,kidneys,spleen,pancreas,abdominalcavity} = data;
           let query = `INSERT INTO ABDOMINAL WHERE(

           ) VALUES (

           )`;

           connection.query( query, function(err,results,fields){
               if(err) throw err;
               response.send(results);
           })
       }
   }

    let ABD_PEL = function(data){
       if(isArray(data)){
           const {liver,kidneys,spleen,pancreas,abdominalcavity} = data;
           let query = `INSERT INTO ABDOMINAL WHERE(

           ) VALUES (

           )`;

           connection.query( query, function(err,results,fields){
               if(err) throw err;
               response.send(results);
           })
       }
   }

   let CRL = function(data){
       if(isArray(data)){
           const {location,foetus_number,crl,cardiacActivity,ga,edd,ovaries,adnexa,abnormals,impression} = data;
           const query = `INSERT INTO CRL WHERE (
              
           )VALUES()`
       }
   }

    if(clientInfo.hasOwnProperty("scan")){
        const scan = clientInfo["scan"];
        switch (scan) {
            case "MSD" :
                MSD(request.body);
                break;
            case "ABDOMINAL":
                ABDOMINAL();
                break;
            case "ABDO_PEL":
                ABD_PEL();
                break;
            case "CRL":
                CRL();
                break;
            default:
                response.send("unknown scan type");

        }

    }

})
.get( function(request,response) {
    response.send("Hello am very good");
})


module.exports = router;