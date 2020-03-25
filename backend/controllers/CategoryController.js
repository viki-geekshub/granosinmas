const { Category, Product, ProductCategory, Sequelize } = require('../models/index.js') ;
const { Op } = Sequelize;
const CategoryController = { 
    getAll(req,res){  
        Category.findAll({
            include:[Product]   
        })
        .then(categories=>res.status(200).send(categories))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        Category.findByPk(req.params.id, {
                include: [Product]
            })
            .then(category => res.send(category))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getOneByCode(req, res) { 
        Category.findOne({  
             where:{
                code:req.params.code
            },
            include: [Product]
        })
        .then(category => res.send(category))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
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
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    insert(req,res){ 
        Category.create({...req.body}) 
        .then(category=>{
            category.addProduct(req.body.ProductId) 
            res.status(201).send({
                message: "La nueva categoría ha sido añadida correctamente.", category
            }) 
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir la nueva categoría.'
            })
        })
    },
    async insertMany(req,res){  
        try {
          const categories =req.body;
          const categoriesResponse =[]
          categories.forEach(async category=>{
            const categoryCreated = await Category.create({...category}); 
            categoryCreated.addProduct(category.ProductId);
            categoriesResponse.push(categoryCreated)
          });
          res.send({
              message: 'Las nuevas categorías han sido añadidas.', categories
          })    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir las nuevas categorías.'
            })
        }           
    },
    put(req,res){ // FALTA QUE AÑADA LOS CAMBIOS EN LA TABLA INTERMEDIA
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
        .then(()=>{
            ProductCategory.destroy({
                where:{
                    CategoryId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "La categoría ha sido eliminada."
        })
    })
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
        .then(()=>{
            ProductCategory.destroy({
                where:{
                    CategoryId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
            res.status(200).send({
                message: "Las categorías han sido eliminadas."
        })
    }) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar las categorías.'
            })
        })
    }    
}
module.exports = CategoryController; 