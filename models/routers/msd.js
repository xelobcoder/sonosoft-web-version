const express = require ("express");
const connection = require("../database");
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
    let MSD;
    let ABDOMINAL;
    let ABD_PEL;
    let CRL;

    MSD = function(data){
       if(data && typeof(data) == "object"){
         const {id,location, gsd,ga,edd, ovaries, adnexa,abnormals, impression,yolk_sac} = data;
         let mysqlQuery = `INSERT INTO MSD WHERE (
            ID,LOCATION,YOLK_SAC,GSD,GA,EDD,OVARIES,ADNEXA,ABNORMAL_FINDINGS,IMPRESSION
         ) VALUES ('${id}','${location}','${yolk_sac}','${gsd}','${ga}','${edd}','${ovaries}','${adnexa}','${abnormals}','${impression}')`;

         connection.query( mysqlQuery, function(err,results,fields){
             if(err) throw err;
             response.send(results)
         })
       }
    }

    ABDOMINAL = function(data){
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

    ABD_PEL = function(data){
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

    CRL = function(data){
        if(isArray(data)){
            const {location,foetus_number,crl,cardiacActivity,ga,edd,ovaries,adnexa,abnormals,impression} = data;
            const query = `INSERT INTO CRL WHERE (
               
            )VALUES()`
        }
    }
})