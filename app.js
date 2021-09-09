const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
app.set("view engine","ejs");


const port = 8000 || process.env.PORT;
app.use(express.static(path.join(__dirname ,"public")));

app.use('/js', express.static(path.join(__dirname, 'public')))
app.listen(port, function(err){
    if(err){
        throw err;
    }
    console.log("connection is successfull");
})


app.get("/", function(req,res,next){
    res.render("index");
})