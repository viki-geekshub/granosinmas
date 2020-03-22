const router = require('express').Router(); // importo la función Router() del express que es lo que nos permite importar y exportar
const ProductController = require('../controllers/ProductController.js'); // importo el archivo ProductController.js

router.get('/',ProductController.getAll); // creo la ruta tipo get y le digo que cuando sea '/' nos ejecute la función getAll() del ProductController 
router.get('/code/:code',ProductController.getOneByCode);
router.get('/name/:name',ProductController.getAllByName);
router.get('/:id',ProductController.getOne);   
router.post('/',ProductController.insert);
router.post('/many',ProductController.insertMany);
router.delete('/many',ProductController.deleteMany); // Pongo el "deleteMany" antes que el "delete" porque sino al pedirle que borre muchos entra primero en el delete del id, para borrar solo uno. 
router.delete('/:id',ProductController.delete);
router.put('/:id',ProductController.put);

module.exports = router;  // exporto la ruta