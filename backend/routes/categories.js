const router = require('express').Router(); 
const CategoryController = require('../controllers/CategoryController.js'); 

router.get('/',CategoryController.getAll)  
router.post('/',CategoryController.insert)
router.post('/many',CategoryController.insertMany)
router.delete('/:id',CategoryController.delete)
router.put('/:id',CategoryController.put)

module.exports = router; 