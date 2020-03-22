const { User, Order } = require('../models/index.js') 
const UserController = { 
    getAll(req,res){  
        User.findAll({
            include:[Order]  
        })
        .then(users=>res.status(200).send(users))
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