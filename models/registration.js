const router = require ("express").Router();

router.use(express.urlencoded({extented: true}));
router.use(express.json())