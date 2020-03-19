const { Product, Category } = require('../models/index.js') // importo el archivo index.js del modelo y lo desestructuro para que solo me de las claves y los valores del producto y de la categoria
const ProductController = { // Creo la función controladora que tiene dentro varias funciones o metodos para hacer cosas diferentes
    getAll(req,res){  // función para traernos información
        Product.findAll({
            include:[Category]  
        })
        .then(products=>res.send(products))
    },
    insert(req,res){ // funcion para meter información
        Product.create({...req.body})
        // .then(product=>res.send(product))
        .then(product=>{
            product.addCategory(req.body.CategoryId)  // Aquí creo una fila (row) en la tabla intermedia para meter el "CategoryId"
            res.status(201).send("El producto ha sido añadido correctamente.") // Creo un objeto con un mensaje y con el producto
        })
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar añadir el producto.')
        })
    
    },
    insertMany(req,res){
        Product.bulkCreate([...req.body])
        .then(product=>{
            res.status(201).send(product)
        })
    },
    put(req,res){  // función para modificar la información
        Product.update({...req.body},{where: {id:req.params.id}})
        .then(product => {
            Product.findByPk(req.params.id)
            res.status(200).send("El producto ha sido modificado correctamente.")
        })
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar modificar el producto.')
        })
    },
    delete(req,res){  // función para borrar información
        Product.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(res.status(200).send("El producto ha sido eliminado"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar eliminar el producto.')
        })
    }
}
module.exports = ProductController;  // exporto la función ProductController.


