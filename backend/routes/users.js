const router = require('express').Router(); 
const UserController = require('../controllers/UserController.js'); 

router.get('/',UserController.getAll)  
// router.post('/',UserController.insert)
// router.post('/many',UserController.insertMany)
// router.delete('/:id',UserController.delete)
// router.put('/:id',UserController.put)

module.exports = router;