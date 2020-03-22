const router = require('express').Router(); 
const CategoryController = require('../controllers/CategoryController.js'); 

router.get('/',CategoryController.getAll);
router.get('/code/:code',CategoryController.getOneByCode);
router.get('/name/:name',CategoryController.getAllByName);
router.get('/:id',CategoryController.getOne);
router.post('/',CategoryController.insert);
router.post('/many',CategoryController.insertMany);
router.delete('/many',CategoryController.deleteMany);
router.delete('/:id',CategoryController.delete);
router.put('/:id',CategoryController.put);

module.exports = router; 