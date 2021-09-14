const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const institutions = require("./models/routers/institution");
// const databaseConnection = require("./models/database");
app.set("view engine","ejs");


const port = 8000 || process.env.PORT;
app.use(express.static(path.join(__dirname ,"public")));

app.use('/js', express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(path.join(__dirname,"public")));
app.use(institutions);
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