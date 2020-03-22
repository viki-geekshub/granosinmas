const { Category, Product, Sequelize } = require('../models/index.js') ;
const { Op } = Sequelize;
const CategoryController = { 
    getAll(req,res){  
        Category.findAll({
            include:[Product]   
        })
        .then(categories=>res.status(200).send(categories))
    },
    getOne(req, res) { 
        Category.findByPk(req.params.id, {
                include: [Product]
            })
            .then(category => res.send(category))
    },
    getOneByCode(req, res) { 
        Category.findOne({  
             where:{
                code:req.params.code
            },
            include: [Product]
        })
        .then(category => res.send(category))
    },
    getAllByName(req, res) { 
        Category.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Product]
            })
            .then(category => res.send(category))
    },
    insert(req,res){ 
        Category.create({
            code:req.body.code,
            name:req.body.name})
        .then(res.status(201).send({
            message: "La nueva categoría se ha creado correctamente."
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar crear la nueva categoría.'
            })
        })
    },
    insertMany(req,res){
        Category.bulkCreate([...req.body])
        .then(category=> res.status(201).send({
            message: 'Las nuevas categorías se han creado correctamente.'
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar crear las nuevas categorias.'
            })
        })
    },
    put(req,res){ 
        Category.update({...req.body},{where: {id:req.params.id}})
        .then(category => {
            Category.findByPk(req.params.id)
            res.status(200).send({
                message: "La categoría ha sido modificada correctamente."
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar modificar la categoría.'
            })
        })
    },
     delete(req,res){  
        Category.destroy({ 
            where:{
                id:req.params.id
            }  
        })
        .then(res.status(200).send({
            message: "La categoría ha sido eliminada."
        })) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar la categoría.'
            })
        })
    },
    deleteMany(req,res){  
        Category.destroy({ 
            where:{
                id:{
                    [Op.in]:req.body.id   
                }
            }  
        })
        .then(res.status(200).send({
            message: "Las categorías han sido eliminadas."
        })) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar las categorías.'
            })
        })
    }    
}
module.exports = CategoryController; 