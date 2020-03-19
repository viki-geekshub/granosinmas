const router = require('express').Router(); 
const OrderController = require('../controllers/OrderController.js'); 

router.get('/',OrderController.getAll)  
router.post('/',OrderController.insert)
router.post('/many',OrderController.insertMany)
router.delete('/:id',OrderController.delete)
router.put('/:id',OrderController.put)

module.exports = router;