const express = require ("express");
const connection = require("../db");
const Database = require ("../database");
const sonosoft = new Database();
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
        sonosoft.idExist(id,"TRANSACTIONID","MSD")
        .then ( (databaseResults) =>  {
            if(databaseResults) {
                if(databaseResults.length == 0) {
                let mysqlQuery = 
                `INSERT INTO MSD  
                ( TRANSACTIONID,LOCATION,YOLKSAC,GA,EDD,OVARIES,ADNEXA,ABNORMAL_FINDINGS,IMPRESSION,WEEKS,DAYS
                        )
                VALUES 
                ('${id}','${location}','${yolksac}','${ga}','${edd}',
                '${ovaries}','${adnexa}','${abnormals}','${impression}',
                '${weeks}','${days}')`;

                connection.query( mysqlQuery, function(err,results,fields){
                    if(err) throw err;
                    response.send({
                        message: "insertion successful"
                    })
                }) 
            } else {
                response.send({
                    message: "client registered with such transactionid",
                    action : "consider updating client information"
                })
            }
            }
        }) 
   }

   let ABDOMINAL = function(data){
           const {liver,spleen,kidneys,pancreas,ofindings,transactionalID, abdominalCavity,impression,right_kidney,left_kidney,spleen_size,liver_size} = data;
           let query = `INSERT INTO ABDOMINALSCAN WHERE(LIVER,SPLEEN,KIDNEYS,PANCREAS,ABDOMINAL_CAVITY,IMPRESSION,LEFT_KIDNEY_SIZE,RIGHT_KIDNEY_SIZE,SPLEEN_SIZE,LIVER_SIZE,TRANSACTIONID,OTHERFINDINGS)VALUES ("${liver}","${spleen}","${kidneys}","${pancreas}","${abdominalCavity}","${impression}","${right_kidney}","${left_kidney}","${spleen_size}","${liver_size}","${transactionalID}","${ofindings}")`;

           connection.query( query, function(err,results,fields){
               if(err) throw err;
               response.send(results);
        })
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
                ABDOMINAL(request.body);
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
.put( function(request,response) {
    let clientInfo = request.body;

    let MSD = function() {
         const {id,location, ga,edd, ovaries,weeks,days, adnexa,abnormals, impression,yolksac} = clientInfo;
         let query =   `
            UPDATE MSD 
            SET LOCATION = "${location}",
                GA = "${ga}",
                EDD = "${edd}",
                OVARIES = "${ovaries}",
                WEEKS = "${weeks}",
                DAYS = "${days}",
                ADNEXA = "${adnexa}",
                ABNORMAL_FINDINGS = "${abnormals}",
                IMPRESSION = "${impression}",
                YOLKSAC = "${yolksac}"
                WHERE 
                TRANSACTIONID = "${id}"
         `;

         connection.query (query, function(err,results,fields) {
             if(err) {
                 throw err;
             }
             response.send({
                 prognosis: "success",
                 message: "client info successfully update"
             })
         })
    }
     if(clientInfo.hasOwnProperty("scan")){
        const scan = clientInfo["scan"];
        switch (scan) {
            case "MSD" :
                MSD(request.body);
                break;
            case "ABDOMINAL":
                ABDOMINAL(request.body);
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


module.exports = router;