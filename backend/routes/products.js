const router = require('express').Router(); // importo la función Router() del express que es lo que nos permite importar y exportar
const ProductController = require('../controllers/ProductController.js'); // importo el archivo ProductController.js

router.get('/',ProductController.getAll)  // creo la ruta tipo get y le digo que cuando sea '/' nos ejecute la función getAll() del ProductController 
router.post('/',ProductController.insert)
router.post('/many',ProductController.insertMany)
router.delete('/:id',ProductController.delete)
router.put('/:id',ProductController.put)

module.exports = router;  // exporto la ruta