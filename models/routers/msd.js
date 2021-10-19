const express = require ("express");
const router = express.Router();

router.use(express.urlencoded({extended: true}))
router.use(express.json());

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

    MSD = function(){
        let mysqlQuery = `INSERT INTO MSD WHERE (
            ID,LOCATION,YOLK_SAC,GSD,GA,EDD,OVARIES,ADNEXA,DATE,ABNORMAL_FINDINGS,IMPRESSION
        ) VALUES ( )`
    }
})