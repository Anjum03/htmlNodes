const router = require('express').Router();

const  register  = require('../controller/userController')


/** HTTP Reqeust */
router.post('/register', register);



module.exports = router;

