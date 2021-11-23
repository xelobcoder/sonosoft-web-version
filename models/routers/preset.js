const express = require("express");
const router = express.Router();
const DatabaseConnection = require ("../database");
const sonosoft = new DatabaseConnection();

router.route('/api/preset')
.all( function(request,response,next){
    response.statusCode = 200;
    response.statusMessage = "All";
    next();
})
.get(  (request,response) => {
    response.send("working alright");
})
.post ( (request,response) => {
    const {scantype } = request.body;

    switch(scantype) {
        case "MSD" :
          sonosoft.presetMsd("MSD_PRESET",response,request); 
        break;
        case "crl" :
          
        break;
        case "abdominal_pelvic" :
          
        break;
        case "abdominal" :
          
        break;
        case "urological" :
          
        break;
        case "pelvic" :
          
        break;
        default:
            response.render("customError")
    }
})


module.exports = router;