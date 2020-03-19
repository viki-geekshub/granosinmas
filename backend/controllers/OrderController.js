const { Order, Product, OrderProduct } = require('../models/index.js') // Aquí importo todos los modelos que voy a utilizar después:
const OrderController = {                               // Importo Product, porque necesitamos incluir los productos en cada pedido
    getAll(req,res){                                    // Importo OrderProduct porque le tengo que añadir el "OrderId" con el bulkCreate, en el insert
        Order.findAll({
            include:[Product]   // Aquí le digo que cuando me busque la información del pedido, me incluya también la información de la tabla de productos, ya que ambas tablas están relacionadas. 
        })
        .then(orders=>res.send(orders))  // Aquí envío lo obtenido con el .findAll en la respuesta
    },
    insert(req,res){ 
        Order.create({
            status:"pending", // Le decimos que inserte una propiedad status que estará por defecto con valor de "pending"
            deliveryDate:req.body.deliveryDate  // Le decimos que inserte una propiedad llamada deliveryDate que tendrá dentro lo que el usuario haya introducido como deliveryDate en el body de la petición
        })
        .then(order=> {  // ESTO NO LO ENTIENDO BIEN
            const products = req.body.products.map(product=>({...product,OrderId:order.id}));  // Aquí para cada pedido, le estamos diciendo que nos haga una transformación con el map en el body de la peticion de productos, y le pedimos que nos busque, mediante el spread "...", de entre todos los productos que hay en la tabla productos, el producto cuyo id coincide con el id de nuestro pedido
            OrderProduct.bulkCreate(products);   // Después creamos de golpe con el metodo "bulkCreate", todos los OrderId, que hemos guardado en la variable products y los metemos en la tabla de cruce OrderProduct
            // order.addProduct(req.body.products),   
            res.send(order);
        })
        .then(res.send("El pedido ha sido enviado"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar enviar el nuevo pedido.'),
            console.log(error)
        })
    },
    delete(req,res){  
        Order.destroy({
            where:{
                id:req.params.id 
            }  // Le estamos diciendo aquí que borre solo el pedido con el id que corresponda. 
        }) // Dentro de la petición, vete a los parámetros, y dentro de los parametros buscame el id que quiero borrar.
        .then(res.send("El pedido ha sido eliminado"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar eliminar el pedido.'),
            console.log(error)
        })
    }

    
}
module.exports = OrderController; 
