const { Product, Category, Sequelize } = require('../models/index.js') // Aquí importo todos los modelos que voy a utilizar después:
// Estoy importando el archivo index.js que esta en la carpeta models porque de ahi puedo sacar todos los modelos que necesite
// y lo desestructuro para que solo me de las claves y los valores del producto y de la categoria. 
// Importo Product, porque necesito el modelo product para funcionar en OrderProduct (lo vamos a llamar muchas veces y si no se importa no lo encuentra.
// Importe Category porque necesito incluir las categorías en cada producto
// Importo OrderProduct porque le tengo que añadir el "OrderId" con el bulkCreate, en el insert
// También importo el Sequelize para que me permita utilizar los operadores de Sequelize que me harán falta después en funciones posteriores
const { Op } = Sequelize; // Desestruturo los operadores de sequelize aquí

const ProductController = { // Creo la función controladora que tiene dentro varias funciones o metodos para hacer diferentes cosas
    getAll(req,res){  // Función para traerme la información de la base de datos. 
        Product.findAll({
            include:[Category]  // Aquí le digo que cuando me busque la información del producto, me incluya también la información de la tabla de categorías, ya que ambas tablas están relacionadas. 
        })
        .then(products=>res.status(200).send(products)) // Aquí envío lo obtenido con el .findAll en la respuesta
    },
    getOne(req, res) { // Función para buscar solo uno de los productos por su id
        Product.findByPk(req.params.id, {
                include: [Category]
            })
            .then(product => res.send(product))
    },
    getOneByCode(req, res) { // Función para buscar solo uno de los productos por su id
        Product.findOne({  
            where:{
                code:req.params.code
            },
            include: [Category]
        })
        .then(product => res.send(product))
    },
    getAllByName(req, res) {  // Función para buscar solo uno de los productos por su nombre
        Product.findAll({  // Esto es como decirle: sequelize.query(`SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`)
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` // Aquí le estoy diciendo que debe incluir el valor de lo que se introduzca en name en algún punto del name
                    }  // Uso el operador like para ello
                },
                include: [Category]
            })
            .then(product => res.send(product))
    },
    insert(req,res){ // Función para meter información en la base de datos
        Product.create({...req.body}) // Aquí le digo que me cree cada producto con sus propiedades dentro, las que nos vengan en el body de la petición
        .then(product=>{
            product.addCategory(req.body.CategoryId)  // Aquí creo una fila (row) en la tabla intermedia para meter el "CategoryId"
            res.status(201).send(
                {message: "El producto ha sido añadido correctamente." // Creo un objeto con un mensaje (antes enviaba tambien el producto pero en cierto momento lo quite y no se si lo tengo que enviar o no)
            }) // DUDAS!!!!
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir el producto.'
            })
        })
    },
    insertMany(req,res){ // Función para añadir varios productos a la vez
        Product.bulkCreate([...req.body])
        .then(product=> res.status(201).send({
            message: 'Los productos han sido añadidos correctamente.'
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir los productos.'
            })
        })
    },
    put(req,res){  // Función para modificar la información de la tabla de datos
        Product.update({...req.body},{where: {id:req.params.id}})
        .then(product => {
            Product.findByPk(req.params.id)
            res.status(200).send({
                message: "El producto ha sido modificado correctamente."
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar modificar el producto.'
            })
        })
    },
    delete(req,res){  // Función para borrar un producto de la base de datos
        Product.destroy({ //Esto sería como decirle: "DELETE FROM categories WHERE id req.params.id;"
            where:{
                id:req.params.id // Le estoy diciendo aquí que borre solo el pedido con el id que corresponda. 
            }  // Y aquí le digo que dentro de la petición, se vaya a los parámetros, y dentro de los parametros me busque el id que quiero borrar.
        }) 
        .then(res.status(200).send({
            message: "El producto ha sido eliminado."
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar el producto.'
            })
        })
    },
    deleteMany(req,res){  // Función para que borre varios productos a la vez
        Product.destroy({   //Esto es como decirle: "DELETE FROM categories WHERE id IN [7,15,3];"
            where:{
                id:{
                    [Op.in]:req.body.id  // En el postman tendré que enviar la peticion mandandole un objeto con la propiedad id y dentro le diré en un array todos los ids que quiero eliminar. Ej: { "id": [7,15,3]}
                }
            }  
        })
        .then(res.status(200).send({
            message: "Los productos han sido eliminados."
        })) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar los productos.'
            })
        })
    }    
}
module.exports = ProductController;  // Aquí exporto la función ProductController.


