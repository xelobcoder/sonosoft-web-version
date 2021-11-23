const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const ejs = require('ejs')
const path = require('path')
const scanPanels = require('./models/routers/msd')
const institutions = require('./models/routers/institution')
const connection = require('./models/db')
const scanpanels = require('./models/routers/scan')
const referer = require('./models/routers/referer')
const registration = require('./models/registration')
const session = require('express-session');
const events = require('./models/events')
const authentication = require('./models/sessions/authentication');
const Database = require("./models/database");
const sonosoft = new Database();
var cookieParser = require('cookie-parser');
const presetRouter = require("./models/routers/preset");

app.set('view engine', 'ejs')

const port = 8000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'public')))
app.use('/assert', express.static(path.join(__dirname, 'public')))
app.use(institutions)
app.use(presetRouter);
app.use(scanpanels)
app.use(scanPanels)
app.use(referer)
app.use(registration);
app.use(cookieParser())



const config = {
  SECRET : "BLOWCATJONESONOSOFTVERSION0.0.1PRODUCTIONBYTIIFUHAMZA",
  SECURE: false,
}

app.use(session({
  secret :config.SECRET,
  resave: false,
  saveUninitialized : false,
  cookie : {
      secure: config.SECURE
  }
}))

server.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log('connection is successfull')
})

io.on('connection', function (socket) {
  console.log(`socket connected by user ${socket.id}`)
})

app.get("/" , (req,res,next) => {
   let User = req.cookies;
   console.log("success");
   if(User) {
     res.render("index")
   } else {
     res.render("login")
   }
   
})

app.get('/index', function (req, res, next) {
  res.render('index')
})
app.get('/settings', function (request, res, next) {
  res.render('setting')
})

app.get('/settings/institutions', function (req, res, next) {
  res.render('institution')
})

app.get('/scans', function (request, response) {
  response.render('scan')
})

app.get('/pelvic', function (request, response) {
  response.render('pelvic')
})
app.get('/abdominal', function (request, response) {
  response.render('abdominal')
})
app.get('/referer', function (request, response) {
  response.render('referer')
})
app.get('/abdominalpelvic', function (request, response) {
  response.render('abdominalpelvic')
})
app.get('/sonoqueue', function (request, response) {
  response.render('sonoqueue')
})
app.get('/institution', function (request, response) {
  response.render('institution')
})

app.get('/crl', function (request, response) {
  response.render('crl')
})
app.get('/requestaccess', function (request, response) {
  response.render('requestaccess')
})
app.get('/scanpanel/:id', function (request, response) {
  const deleteID = request.params.id
  const retrieveSingle = function () {
    const sql = `SELECT * FROM SCAN WHERE ID = '${deleteID}'`
    connection.query(sql, function (err, results, fields) {
      if (err) throw err
      response.send(results)
    })
  }
  retrieveSingle()
})

app.get('/referers/:id', function (request, response) {
  const deleteID = request.params.id
  const retrieveSingle = function () {
    const sql = `SELECT * FROM REFERER WHERE ID = '${deleteID}'`
    connection.query(sql, function (err, results, fields) {
      if (err) throw err
      response.send(results)
    })
  }
  retrieveSingle()
})

app.get('/institutions/:id', function (request, response) {
  const deleteID = request.params.id
  const retrieveSingle = function () {
    const sql = `SELECT * FROM INSTITUTIONS WHERE ID = '${deleteID}'`
    connection.query(sql, function (err, results, fields) {
      if (err) throw err
      response.send(results)
    })
  }
  retrieveSingle()
})

app.get('/clients', function (request, response) {
  response.render('clients')
})

app.get('/finance', function (request, response) {
  response.render('finance')
})

// all templete rendering

app.get('/msd', function (request, response) {
  response.render('msd')
})

//  renders template depending on selected scan on user input

const renderTemplate = (scan, id, response) => {
  const query = `SELECT * FROM REGISTRATION WHERE TRANSACTIONID = ${id}`

  const templates = {
    MSD: 'msd',
    ABDOMINAL: 'abdominal',
    CRL: 'crl',
    ABDOMINAL_PELVIC: 'abdominalpelvic',
    UROLOGY: 'urology',
    BREAST: 'breast',
  }
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    if (results.length === 0) {
      // redirect to custom error templete pages with custom message
      response.render('customError', { message: 'CUSTOMER ID NOT VALID' })
    } else {
      let result = {
        transactionID: results[0]['TRANSACTIONID'],
        fullname: results[0]['FULLNAME'],
      }
      response.render(templates[scan], result)
    }
  })
}

app.get('/abdominal/:id', function (request, response) {
  const uuid = request.params.id
  renderTemplate('ABDOMINAL', uuid, response)
})

app.get('/msd/:id', function (request, response) {
  const uuid = request.params.id
  renderTemplate('MSD', uuid, response)
})

app.get('/crl/:id', function (request, response) {
  const uuid = request.params.id
  renderTemplate('CRL', uuid, response)
})

app.get('/abdominal_pelvic/:id', function (request, response) {
  const uuid = request.params.id
  renderTemplate('ABDOMINAL_PELVIC', uuid, response)
})

app.get('/login', (req, res) => {  
  res.render('login')
})

app.get('/addUser', (req, res) => {
  res.render('adduser')
})

app.get('/viewhistory/:id', (request, response) => {
  const uuid = request.params.id
  console.log(uuid)
  const query = `SELECT HISTORY FROM REGISTRATION WHERE ID = "${uuid}"`
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    response.send(results)
    console.log(results)
  })
})


// depend page to land user depening on the login credentials



app.post('/authenticateUser', function (request, response) {
  const { username, password } = request.body
  let authenticate = new authentication(username, password)
  authenticate
    .hasUsername()
    .then((t) => {
      if (t != 0) {
        authenticate
          .comparePassword(password)
          .then((d) => {
            if(d == true) {
              authenticate.roleIdentification(username)
              .then((v) => {
                console.log(v)
                 authenticate.landingPage(v,response);
              }).catch ((err) => {throw err})
            } else {
               response.send ({
                 message: "login credentials wrong",
                 action: "try again with new credentials or contact admin"
               })
            }
          })
          .catch((err) => {
            throw err
          })
      } else {
        response.send({
          message: 'No username found',
          action: 'kindly request for access',
        })
      }
    })
    .catch((error) => {
      throw error
    })

  authenticate.saveLoginDetails()
})

app.post('/newusers', (request, response) => {
  const { username, password } = request.body
  let logger = new authentication(username, password)
  logger.saveLoginDetails(request.body, response);
})


app.get("/workedcases/:id", (request,response) => {
   let scan = request.params.id.slice(1);
   if(scan === "msd") {
     sonosoft.workedCases("MSD",response,100);
   } else if (scan === "abdominal") {
     sonosoft.workedCases("abdominalscan",response,300);
   } else if (scan === "abdominalpelvic") {
     sonosoft.workedCases("abdominalpelvic",response,200);
   } else if (scan === "crl") {
     sonosoft.workedCases("crl",response,100);
   } else if (scan === "pelvic") {
     sonosoft.workedCases("pelvic",response,200);
   } else if (scan === "urological") {
     sonosoft.workedCases("urological",response,100);
   }
    else {
     response.send({message: `${scan} as a table not know`})
   }
})

// render abdominal scan preset form

app.get("/abdominalpreset", function(request,response) {
  response.render("abdominalpreset")
})

app.post("/prefill", (request,response) => {
   const {scan, transactionID } = request.body;
   console.log(transactionID)
   sonosoft.returnArow(scan,response,transactionID);
})


app.post("/api/filterid" , (request,response) => {
   const { transactionID, tablename} = request.body;
   console.log(request.body)
   if(transactionID) {
     const myquery = `SELECT * FROM ${tablename} WHERE TRANSACTIONID LIKE "${transactionID}%" LIMIT  100`;
     connection.query (myquery, function(err,results,fields) {
       if(err) throw err;
       console.log(results)
       response.send(results);
     })
   }
})
