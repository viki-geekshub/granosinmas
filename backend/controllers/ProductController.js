const { Product, Category, ProductCategory, Sequelize, sequelize } = require('../models/index.js') // Aquí importo todos los modelos que voy a utilizar después:
// Estoy importando el archivo index.js que esta en la carpeta models porque de ahi puedo sacar todos los modelos que necesite
// y lo desestructuro para que solo me de las claves y los valores del producto y de la categoria. 
// Importo Product, porque necesito el modelo product para funcionar en OrderProduct (lo vamos a llamar muchas veces y si no se importa no lo encuentra.
// Importo Category porque necesito incluir las categorías en cada producto
// También importo el Sequelize para que me permita utilizar los operadores de Sequelize que me harán falta después en funciones posteriores
const { Op } = Sequelize; // Desestruturo los operadores de sequelize aquí

const ProductController = { // Creo la función controladora que tiene dentro varias funciones o metodos para hacer diferentes cosas
    getAll(req,res){  // Función para traerme todos los productos de la base de datos. 
        Product.findAll({
            include:[Category]  // Aquí le digo que cuando me busque la información del producto, me incluya también la información de la tabla de categorías, ya que ambas tablas están relacionadas. 
        })
        .then(products=>res.status(200).send(products)) // Aquí envío lo obtenido con el .findAll en la respuesta
    },
    getOne(req, res) { // Función para buscar un solo producto por su id
        Product.findByPk(req.params.id, {
                include: [Category]
            })
            .then(product => res.send(product))
    },
    getOneByCode(req, res) { // Función para buscar un producto por su code
        Product.findOne({  
            where:{
                code:req.params.code
            },
            include: [Category]
        })
        .then(product => res.send(product))
    },
    getAllByName(req, res) {  // Función para buscar un producto por su nombre
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
    insert(req,res){ // Función para insertar un producto 
        Product.create({...req.body}) // Aquí le digo que me cree cada producto con sus propiedades dentro, las que nos vengan en el body de la petición
        .then(product=>{
            product.addCategory(req.body.CategoryId)  // Aquí creo una fila (row) en la tabla intermedia para meter el "CategoryId"
            res.status(201).send({
                message: "El producto ha sido añadido correctamente.", product
            }) 
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir el producto.'
            })
        })
    },
    async insertMany(req,res){  // Función para insertar varios productos a la vez como un array de objetos con sus propiedades en el body
        try {
          const products =req.body;
          const productsResponse =[]
          products.forEach(async product=>{
            const productCreated = await Product.create({...product}); 
            productCreated.addCategory(product.CategoryId);
            productsResponse.push(productCreated)
          });
          res.send({
              message: 'Los productos han sido añadidos.', products
          })    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir los productos.'
            })
        }           
    },
    // put(req,res){   // Función para modificar un producto
    //     Product.update({
    //         where:{
    //             id:req.params.id 
    //         }  
    //     }) 
    //     .then(()=>{
    //         ProductCategory.update({
    //             where:{
    //                 ProductId:req.params.id 
    //             }  
    //         }) 
    //         res.status(200).send({
    //         message: "El producto ha sido modificado."
    //     })
    // })
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar modificar el producto.'
    //         })
    //     })
    // },
    put(req,res){  // Función para modificar la información de la base de datos  
        Product.update({...req.body},{where: {id:req.params.id}})
        .then(product => {   // NO FUNCIONA, NO CAMBIA LA INFO DE LA TABLA INTERMEDIA 
            if(req.body.CategoryId) {
                sequelize.query(`DELETE FROM CategoryId WHERE CategoryId = ${req.params.id}`);
                product.addCategory(req.body.CategoryId);
            }
            if(req.body.OrderId) {
                sequelize.query(`DELETE FROM OrderId WHERE OrderId = ${req.params.id}`);
                product.addOrder(req.body.OrderId);
            }
            res.status(200).send({
                message: "El producto ha sido modificado correctamente.", product
            })
        })
        // .then(product => {
        //     Product.findByPk(req.params.id)
        //     res.status(200).send({
        //         message: "El producto ha sido modificado correctamente."
        //     })
        // })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar modificar el producto.'
            })
        })
    },
    delete(req,res){   // Función para borrar un producto
        Product.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{
            ProductCategory.destroy({
                where:{
                    ProductId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "El producto ha sido eliminado."
        })
    })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar el producto.'
            })
        })
    },
    deleteMany(req,res){  // Función para borrar varios productos a la vez
        Product.destroy({
            where:{
                id:{
                    [Op.in]:req.body.id
                }
            }  
        })
        .then(()=>{
            ProductCategory.destroy({
                where:{
                    ProductId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
            res.status(200).send({
                message: "Los productos han sido eliminados."
        })
    }) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar los productos.'
            })
        })
    }    
}
module.exports = ProductController;  // Aquí exporto la función ProductController.


