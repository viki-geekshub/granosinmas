const { User, Order } = require('../models/index.js') 
const UserController = { 
    getAll(req,res){  
        User.findAll({
            include:[Order]  
        })
        .then(users=>res.send(users))
    },
    insert(req,res){ 
        User.create({...req.body})
        .then(user=>res.send(user))
        .then(res.send("El usuario ha sido registrado"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar registrar el usuario.'),
            console.log(error)
        })
    },
    delete(req,res){  
        User.destroy({
            where:{
                id:req.params.id 
            }  
        })
        .then(res.send("El usuario ha sido eliminado"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar eliminar el usuario.'),
            console.log(error)
        })
    } 
    
}
module.exports = UserController; 