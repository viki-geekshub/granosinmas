const router = require('express').Router(); 
const OrderController = require('../controllers/OrderController.js'); 

router.get('/',OrderController.getAll);
// router.get('/code/:code',OrderController.getOneByCode);
// router.get('/name/:name',OrderController.getAllByName);
router.get('/:id',OrderController.getOne); 
router.post('/',OrderController.insert);
router.post('/many',OrderController.insertMany);
router.delete('/many',OrderController.deleteMany) // no se borran los pedidos
router.delete('/:id',OrderController.delete)
router.put('/:id',OrderController.put);


module.exports = router;