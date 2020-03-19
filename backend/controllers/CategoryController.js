const { Category, Product } = require('../models/index.js') 
const CategoryController = { 
    getAll(req,res){  
        Category.findAll({
            include:[Product]   
        })
        .then(categories=>res.send(categories))
    },
    insert(req,res){ 
        Category.create({...req.body})
        .then(category=>res.send(category))
        .then(res.send("Se ha añadido la nueva categoría"))
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar añadir la nueva categoría.')
        })
    },
    delete(req,res){  
        Category.destroy({
            where:{
                id:req.params.id 
            }  
        })
        .then(res.send("La categoría ha sido eliminada")) 
        .catch(error=> {
            res.status(500).send('Ha habido un error al intentar eliminar la categoría.'),
            console.log(error)
        })
    }    
}
module.exports = CategoryController; 