const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

router.get('/',async (req, res) => {

  try { // using to talk to a server or a database

    const product = await Product.findAll();
    if (product) {
      res.json(product); // returns a json objects made of any varible input
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Product" });
  }


  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product

router.get('/:id',async (req, res) => {

  try { // using to talk to a server or a 
    
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (product) {

      res.json(product); // returns a json objects made of any varible input

    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Product" });
  }

  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/',async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });

    // Check if req.body.tags exists and has some length
    if (req.body.tags && req.body.tags.length > 0) {
      // Retrieve product tags and their IDs
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Filter new product tags and create new ones
      const newProductTags = req.body.tags
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Filter product tags to remove and delete them
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Respond with updated product
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Tag }],
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
// delete one product by its `id` value

router.delete('/:id', (req, res) => {
Product.destroy({
 where:{id:req.params.id} 
})
  .then ((deleteproduct) => {
    res.json(deleteproduct)
  }).catch((err) => ({ message: 'no product found with this ID'}))
});

module.exports = router;
