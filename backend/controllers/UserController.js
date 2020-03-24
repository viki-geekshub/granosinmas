const { User, Order, Sequelize } = require('../models/index.js') 
const { Op } = Sequelize;
const UserController = { 
    getAll(req,res){  
        User.findAll({
            include:[Order]  
        })
        .then(users=>res.status(200).send(users))
    },
    getOne(req, res) { 
        User.findByPk(req.params.id, {
                include: [Order]
            })
            .then(user => res.send(user))
    },
    getAllByName(req, res) { 
        User.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Order]
            })
            .then(user => res.send(user))
    },
    registerUser(req,res) { // Función para registrar un usuario // NO FUNCIONA
        User.create({...req.body})
        .then(user=> res.send({
            message: 'Usuario registrado correctamente.', user
        }))
        .catch(error=>{
            console.log(error)
            res.status(500).send({message: 'Ha surgido un error al intentar registrar el usuario.', error
            })
        })
        
    }
    // insert(req,res){ 
    //     User.create({...req.body})
    //     .then(user=> res.status(201).send({
    //         message: "El usuario ha sido registrado."
    //     }))
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar registrar al usuario.'
    //         })
    //     })
    // },
    // insertMany(req,res){
    //     User.bulkCreate([...req.body])
    //     .then(user=> res.status(201).send({
    //         message: 'Los usuarios han sido registrados.'
    //     }))
    //     .catch(error=> {
    //         console.lot(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar registrar los usuarios.'
    //         })
    //     })
    // },
    // put(req,res){ 
    //     User.update({...req.body},{where: {id:req.params.id}})
    //     .then(user => {
    //         User.findByPk(req.params.id)
    //         res.status(200).send({
    //             message: "Los datos del usuario han sido modificados correctamente."
    //         })
    //     })
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message:'Ha habido un error al intentar modificar los datos del usuario.'
    //         })
    //     })
    // },
    // delete(req,res){  
    //     User.destroy({
    //         where:{
    //             id:req.params.id 
    //         }  
    //     })
    //     .then(res.status(200).send({
    //         message: "El usuario ha sido eliminado."
    //     }))
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar eliminar al usuario.'
    //         })
    //     })
    // } 
}
module.exports = UserController; 