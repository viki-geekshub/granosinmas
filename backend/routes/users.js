const router = require('express').Router(); 
const UserController = require('../controllers/UserController.js'); 

const { User } = require('../models/index.js');  // importo el index.js de la carpeta models

router.get('/',UserController.getAll)  
router.get('/name/:name',UserController.getAllByName);
router.get('/:id',UserController.getOne);

router.post('/register',UserController.registerUser); // Creo la ruta para registrar un usuario (REGISTRO)

// router.post('/',UserController.insert)
// router.post('/many',UserController.insertMany)
// router.delete('/:id',UserController.delete)
// router.put('/:id',UserController.put)

module.exports = router;