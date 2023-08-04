const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {

  try { // using to talk to a server or a database

    const tag = await Tag.findAll();

    if (tag) {

      res.json(tag); // returns a json objects made of any varible input
    } else {

      res.status(404).json({ error: "Tag not found" });
    }

  } catch (error) {

    res.status(500).json({ error: "Failed to get Tag" });
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id',async (req, res) => {

  try { // using to talk to a server or a 
    
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    if (tag) {

      res.json(tag); // returns a json objects made of any varible input

    } else {

      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {

    res.status(500).json({ error: "Failed to get Tag" });
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/',async (req, res) => {

  try {
    
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Tag" });
  }

  // create a new tag
});

router.put('/:id',async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    const { tag_name} = req.body;

    if (tag) {
      tag.tag_name = tag_name
      await tag.save();
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Tag is not updated" });
  }


  // update a tag's name by its `id` value
});




router.delete('/:id',async (req, res) => {

  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (tag) {
      await tag.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Tag" });
  }

  // delete on tag by its `id` value
});

module.exports = router;
