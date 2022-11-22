const router = require('express').Router();
const { restart } = require('nodemon');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:
    [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
  .then((tagData)=> {
    res.json(tagData);
  }).catch((err)=> res.json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({where:
  {
    id: req.params.id
  },
    include:
    [
      {
        model: Product,
        through: ProductTag
      }

    ]
}).then((singleTagData) => {
  res.json(singleTagData);
}).catch((err)=> res.json(err));

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((freshTag)=> {
    res.json(freshTag);
  }).catch((err)=> res.json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
      id: req.body.id,
      tag_name: req.body.tag_name,
  },
  {
    where:{
      id:req.body.id
    }
  }).then((uTag)=> {
    res.json(uTag);
}).catch((err)=> res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    },
  }).then((noTag) => {
    res.json(noTag)
  }).catch((err)=> res.json(err));
});

module.exports = router;
