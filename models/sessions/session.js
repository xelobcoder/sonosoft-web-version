const express = require ("express");
const session = require ("express-session");
const router = express.Router();

const config = {
    SECRET : "BLOWCATJONESONOSOFTVERSION0.0.1PRODUCTIONBYTIIFUHAMZA",
    SECURE: true,
}

router.use(session({
    secret :config.SECRET,
    resave: false,
    saveUninitialized : false,
    cookie : {
        secure: config.SECURE
    }
}))


router.get('/',  function(req, res,next) {
   const USER = req.session.user;
   if(USER) {
       res.render("index");
   } else {
       res.render("login")
   }
})



module.exports = router;