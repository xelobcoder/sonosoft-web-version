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
           let query = `INSERT INTO ABDOMINALSCAN (LIVER,SPLEEN,KIDNEYS,PANCREAS,ABDOMINAL_CAVITY,IMPRESSION,LT_KIDNEY_SIZE,RT_KIDNEY_SIZE,SPLEEN_SIZE,LIVER_SIZE,TRANSACTIONID,OTHERFINDINGS)VALUES ("${liver}","${spleen}","${kidneys}","${pancreas}","${abdominalCavity}","${impression}","${right_kidney}","${left_kidney}","${spleen_size}","${liver_size}","${transactionalID}","${ofindings}")`;

           connection.query( query, function(err,results,fields){
               if(err) throw err;
               if(results) {
                   response.send( {
                       message: "insertion success",
                       action: "page refresh"
                   })
               }
        })
   }

    let ABD_PEL = function(data){
       if(isArray(data)){
           const {liver,kidneys,spleen,pancreas,abdominalcavity} = data;
           let query = `INSERT INTO ABDOMINAL (

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

   let SECOND = function(data) {
      const {
         transactionalID,
         method,
         frequency,
         number,
         placenta,
         placentaAppearance,
         placentaGrade,
         volume,
         FLM,
         ammniotic,
         FLW,
         FLD,
         ACM,
         ACW,
         ACD,
         BPDM,
         BPDD,
         BPDW,
         HCM,
         HCW,
         HCD,
         cardiacActivity,
         presentation,
         cervix,
         cervicalLength,
         otherfindings,
         impression,
         edd,
         efw,
         fhr
      } = data;
      
      let query = `INSERT INTO SECOND_THIRD (
          TRANSACTIONID,
          METHOD,
          FREQUENCY,
          FOESTUS,
          PLACENTA_LOCATION,
          PLACENTA_APPEAR,
          PLACENTA_GRADE,
          AMNIOTIC_ASSESMENT,
          AMNIOTIC_VOLUME,
          FL,
          FLW,
          FLD,
          ACM,
          ACW,
          ACD,
          BPDM,
          BPDD,
          BPDW,
          HCM,
          HCW,
          HCD,
          PRESENTATION,
          CARDIAC_ACTIVITY,
          FHR,
          EDD,
          EFW,
          CERVICAL_LENGTH,
          CERVIX,
          OTHER_FINDINGS,
          IMPRESSION
      ) VALUES (
          "${transactionalID}",
          "${method}",
          "${frequency}",
          "${number}",
          "${placenta}",
          "${placentaAppearance}",
          "${placentaGrade}",
          "${ammniotic}",
          "${volume}",
          "${FLM}",
          "${FLW}",
          "${FLD}",
          "${ACM}",
          "${ACW}",
          "${ACD}",
          "${BPDM}",
          "${BPDW}",
          "${BPDD}",
          "${HCM}",
          "${HCW}",
          "${HCD}",
          "${presentation}",
          "${cardiacActivity}",
          "${fhr}",
          "${edd}",
          "${efw}",
          "${cervicalLength}",
          "${cervix}",
          "${otherfindings}",
          "${impression}"  
      )`;

      connection.query(query, (err,results,fields)=> {
          if(err) throw err;
          if(results) {
              response.send({
                  message: "Data inserted successfully"
              })
              console.log(results)
          }
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
            case "SECOND":
                SECOND(request.body);
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

    let ABDOMINAL = function(data) {
        const {liver,spleen,kidneys,pancreas,ofindings,transactionalID, abdominalCavity,impression,right_kidney,left_kidney,spleen_size,liver_size} = data;

        const query = `UPDATE ABDOMINALSCAN
         SET LIVER = "${liver}",
             SPLEEN = "${spleen}",
             KIDNEYS = "${kidneys}",
             PANCREAS = "${pancreas}",
             OTHERFINDINGS = "${ofindings}",
             ABDOMINAL_CAVITY = "${abdominalCavity}",
             IMPRESSION = "${impression}",
             LT_KIDNEY_SIZE = "${left_kidney}",
             RT_KIDNEY_SIZE = "${right_kidney}",
             SPLEEN_SIZE = "${spleen_size}",
             LIVER_SIZE = "${liver_size}"
        WHERE 
             TRANSACTIONID = ${transactionalID}
         `;

         connection.query( query, (err,results,fields) => {
             if(err) throw err;
             response.send({
                 message: "update successfull"
             })
         })
    }

    let SECOND = (data) => {
        const {
            transactionalID,
            method,
            frequency,
            number,
            placenta,
            placentaAppearance,
            placentaGrade,
            volume,
            FLM,
            ammniotic,
            FLW,
            FLD,
            ACM,
            ACW,
            ACD,
            BPDM,
            BPDD,
            BPDW,
            HCM,
            HCW,
            HCD,
            cardiacActivity,
            presentation,
            cervix,
            cervicalLength,
            otherfindings,
            impression,
            edd,
            efw,
            fhr
         } = data;

         const query = `UPDATE SECOND_THIRD
                SET METHOD =  "${method}",
                    FREQUENCY = "${frequency}",
                    FOESTUS = "${number}",
                    PLACENTA_LOCATION = "${placenta}",
                    PLACENTA_APPEAR = "${placentaAppearance}",
                    PLACENTA_GRADE = "${placentaGrade}",
                    AMNIOTIC_ASSESMENT = "${ammniotic}",
                    AMNIOTIC_VOLUME = "${volume}",
                    FL = "${FLM}",
                    FLW = "${FLW}",
                    FLD = "${FLD}",
                    ACM = "${ACM}",
                    ACW = "${ACW}",
                    ACD = "${ACD}",
                    BPDM = "${BPDM}",
                    BPDW = "${BPDW}",
                    BPDD = "${BPDD}",
                    HCM = "${HCM}",
                    HCW = "${HCW}",
                    HCD = "${HCD}",
                    PRESENTATION = "${presentation}",
                    CARDIAC_ACTIVITY = "${cardiacActivity}",
                    FHR = "${fhr}",
                    EDD = "${edd}",
                    EFW = "${efw}",
                    CERVICAL_LENGTH = "${cervicalLength}",
                    CERVIX = "${cervix}",
                    OTHER_FINDINGS = "${otherfindings}",
                    IMPRESSION = "${impression}"  
            WHERE TRANSACTIONID =  "${transactionalID}"
         `;

         connection.query( (query , (err,results,fields) => {
             if(err) throw err;
             response.send({
                 message: "update succesfull"
             })
         }))


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
            case "SECOND":
                SECOND(request.body);
                break;
            case "CRL":
                CRL(request.body);
                break;
            default:
                response.send("unknown scan type");

        }

    }
})




module.exports = router;