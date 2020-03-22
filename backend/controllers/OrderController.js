const { Order, Product, Sequelize } = require('../models/index.js') 
const { Op } = Sequelize;                    // Importo Order para llamarlo después en el resto del archivo.
const OrderController = {                   // Importo Product, porque necesito incluir los productos en cada pedido
    getAll(req,res){                        // Importo OrderProduct porque le tengo que añadir el "OrderId", EL "ProductId" y el "productUnits" con el bulkCreate, en el insert
        Order.findAll({
            include:[Product]   // Aquí le digo que cuando me busque la información del pedido, me incluya también la información de la tabla de productos, ya que ambas tablas están relacionadas. 
        })
        .then(orders=>res.status(200).send(orders))  
    },
    getOne(req, res) { 
        Order.findByPk(req.params.id, {
                include: [Product]
            })
            .then(order => res.send(order))
    },
    // getOneByCode(req, res) {   // Los pedidos no tienen numero de codigo por ahora
    //     Order.findOne({  
    //          where:{
    //             code:req.params.code
    //         },
    //         include: [Product]
    //     })
    //     .then(order => res.send(order))
    // },
    // getAllByName(req, res) {  // Los pedidos no tienen nombre
    //     Order.findAll({  
    //             where: { 
    //                 name: {
    //                     [Op.like]: `%${req.params.name}%` 
    //                 }  
    //             },
    //             include: [Product]
    //         })
    //         .then(order => res.send(order))
    // },
    insert(req,res){ 
        Order.create({
            UserId: req.body.UserId, // Le digo que inserte una propiedad llamada UserId que tendrá dentro el UserId del cuerpo de la petición.
            deliveryDate:req.body.deliveryDate,  // Le digo que inserte una propiedad llamada deliveryDate que tendrá dentro lo que el usuario haya introducido como deliveryDate en el body de la petición
            status:"pending" // Le digo que inserte una propiedad status que irá por defecto con valor de "pending"
        })
        .then(order=> {  // ESTO NO LO ENTIENDO MUY BIEN // PREGUNTAR A DAVID PARA QUE ME INSERTE EN TABLA INTERMEDIA TANTO EL ProductId como el productUnits
            // const products = req.body.products.map(product=>({ // Aquí para cada pedido, le estoy diciendo que me haga una transformación con el map en el body de la peticion de productos, y le pido que me busque, mediante el spread "...", de entre todos los productos que hay en la tabla productos, el producto cuyo id coincide con el id de mi pedido
            //     ...product,OrderId:order.id,
            //     // ...Product,ProductId:Product.id
            // }));
            // // const units=req.body.units.map(unit=>({
            // //     productUnits:unit
            // // }))
            // OrderProduct.bulkCreate(products);   // Después creo de golpe con el metodo "bulkCreate", todos los OrderId, que he guardado en la variable products y los meto en la tabla de cruce "OrderProduct"
            
            // order.addProduct(req.body.products), // ESTO YA NO VALE

            req.body.ProductId.forEach(product => {  // ESTO NO FUNCIONA
                order.addProduct(req.body.ProductID)
                }),
                req.body.units.forEach(unit=>{
                    order.addproductUnits(req.body.unit)
                })
           
            res.status(201).send({
                message: "Tu pedido ha sido enviado"
            });
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar enviar tu pedido.'
            })
        })
    },
    insertMany(req,res){
        Order.bulkCreate([...req.body])
        .then(order=> res.status(201).send({
            message: 'Tus pedidos han sido enviados.'
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar enviar tus pedidos.'
            })
        })
    },
    put(req,res){ 
        Order.update({...req.body},{where: {id:req.params.id}})
        .then(order => {
            Order.findByPk(req.params.id)
            res.status(200).send({
                message: "Tu pedido se ha modificado correctamente."
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar modificar tu pedido.'
            })
        })
    },
    // NO SE BORRAN LOS PEDIDOS - SE CAMBIA EN TODO CASO EL STATUS
    // delete(req,res){  
    //     Order.destroy({
    //         where:{
    //             id:req.params.id 
    //         }  
    //     }) 
    //     .then(res.status(200).send({
    //         message: "Tu pedido ha sido eliminado."
    //     }))
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar eliminar tu pedido.'
    //         })
    //     })
    // },
    // deleteMany(req,res){  
    //     Order.destroy({
    //         where:{
    //             id:{
    //                 [Op.in]:req.body.id
    //             }
    //         }  
    //     })
    //     .then(res.status(200).send({
    //         message: "Tus pedidos han sido eliminados."
    //     })) 
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar eliminar tus pedidos.'
    //         })
    //     })
    // }    
}
module.exports = OrderController; 
