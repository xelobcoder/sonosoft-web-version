const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const institutions = require("./models/routers/institution");
const connection = require("./models/database");
const scanpanels = require ("./models/routers/scan");


app.set("view engine","ejs");


const port = 8000 || process.env.PORT;
app.use(express.static(path.join(__dirname ,"public")));

app.use('/js', express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(path.join(__dirname,"public")));
app.use(institutions);
app.use(scanpanels)
app.listen(port, function(err){
    if(err){
        throw err;
    }
    console.log("connection is successfull");
})


app.get("/", function(req,res,next){
    res.render("index");
})
app.get("/settings", function(request,res,next){
    res.render("setting");
})

app.get("/settings/institutions",function(req,res,next){
    res.render("institution")
})

app.get("/scans", function(request,response){
    response.render("scan");
})
app.get("/scanpanel/:id", function(request,response){
    const deleteID = request.params.id
    const retrieveSingle = function(){
        const sql = `SELECT * FROM SCAN WHERE ID = '${deleteID}'`;
        connection.query(sql,
            function(err,results,fields){
                if(err) throw err;
                response.send(results)
            }
        )
    }
    retrieveSingle();
})