const router = require('express').Router();
const { request } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {

  try { // using to talk to a server or a database

    const category = await Category.findAll();
    if (category) {
      res.json(category); // returns a json objects made of any varible input
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Category" });
  }



  // find all categories

  // be sure to include its associated Products
});

router.get('/:id',async (req, res) => {

  try { // using to talk to a server or a 
    
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (category) {

      res.json(category); // returns a json objects made of any varible input

    } else {

      res.status(404).json({ error: "Catergory not found" });
    }

  } catch (error) {
    
    res.status(500).json({ error: "Failed to get Category" });
  }


  // find one category by its `id` value
  // be sure to include its associated Products
});



router.post('/', async(req, res) => {
try {
  const category = await Category.create({
    category_name: req.body.category_name
    })
    res.status(200).json(category);
}

catch (error) {

res.status(500).json({ error: "Failed to create Category" });
}



  // create a new category
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value

  try {
    await Category.update({ category_name: req.body.category_name},

      {
      where:{id:req.params.id}
      })
      res.status(200).json("updated Successfully");
  }
  
  catch (error) {
  
  res.status(500).json({ error: "Failed to create Category" });
  }
});

router.delete('/:id', async(req, res) => {

  try {
    await Category.destroy({
      where:{id:req.params.id}
      })
      res.status(200).json("Deleted Successfully");
  }
  
  catch (error) {
  
  res.status(500).json({ error: "Failed to create Category" });
  }
  
  


  // delete a category by its `id` value
});

module.exports = router;

// all that there is left to do is follow your routes and controllers from budget buddy and follow the same steps and just change the appropiate routes to each ones ID/variable name and make sure it connects.