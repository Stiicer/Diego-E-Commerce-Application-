const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
 let data = await Category.findAll({
  include:[{
      model: Product
  }]
 });
 res.status(200).json(data);
} catch(err){res.status(500).json(err)};
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    let data = await Category.findByPk(req.params.id,{
      include: [{
        model: Product
      }]
    }) 
    if(data == null){
      res.status(400).json({
        message: 'id does not exist'
      });
    }res.status(200).json(data);
  }catch(err){res.status(500).json(err)}
  });

router.post('/', (req, res) => {
  // create a new category
  try{
    let data = Category.create(req.body);
    res.status(200).json({
      message: 'Category made'
    })
  }catch(err){res.status(500).json(error)};
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    let data = await Category.update({
      category_name: req.body.category_name
    },
      {where:{ 
        id: req.params.id
      }});
      res.status(200).json({
        message: 'Category updated'
      });
    }catch(err){res.status(500).json(error)};
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    let data = await Category.destroy({
      where:{
        id:req.params.id
      }
    });
  }catch(err){res.status(500).json(error)};
});

module.exports = router;
