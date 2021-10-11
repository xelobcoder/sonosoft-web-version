const express = require("express");
const http = require ("http");
const app = express();
const server = http.createServer(app);
const io= require("socket.io")(server);
const ejs = require("ejs");
const path = require("path");
const institutions = require("./models/routers/institution");
const connection = require("./models/database");
const scanpanels = require ("./models/routers/scan");
const referer = require("./models/routers/referer");
const registration = require("./models/registration");


app.set("view engine","ejs");



const port = 8000 || process.env.PORT;
app.use(express.static(path.join(__dirname ,"public")));
app.use('/js', express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(path.join(__dirname,"public")));
app.use(institutions);
app.use(scanpanels);
app.use(referer);
app.use(registration);
server.listen(port, function(err){
    if(err){
        throw err;
    }
    console.log("connection is successfull");
})


io.on("connection", function(socket){
    console.log(`socket connected by user ${socket.id}`);
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

app.get("/referer", function(request,response){
    response.render("referer");
})

app.get("/sonoqueue", function(request,response){
    response.render("sonoqueue");
})
app.get("/institution", function(request,response){
    response.render("institution");
})

app.get("/crl", function(request,response){
    response.render("crl")
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


app.get("/referers/:id", function(request,response){
    const deleteID = request.params.id
    const retrieveSingle = function(){
        const sql = `SELECT * FROM REFERER WHERE ID = '${deleteID}'`;
        connection.query(sql,
            function(err,results,fields){
                if(err) throw err;
                response.send(results)
            }
        )
    }
    retrieveSingle();
})



app.get("/institutions/:id", function(request,response){
    const deleteID = request.params.id
    const retrieveSingle = function(){
        const sql = `SELECT * FROM INSTITUTIONS WHERE ID = '${deleteID}'`;
        connection.query(sql,
            function(err,results,fields){
                if(err) throw err;
                response.send(results)
            }
        )
    }
    retrieveSingle();
})


app.get("/clients", function(request,response){
    response.render("clients")
})

app.get("/finance", 
    function(request,response) {
        response.render("finance");
    }
)