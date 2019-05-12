const express = require('express');
const router = express.Router();
const Posts = require('../data/db');

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.send(500).json({ error: 'Error retrieving posts ' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    } else {
      const posts = await Posts.insert(req.body);
      res.status(201).send(posts);
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.length) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    if (!post) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const postId = await Posts.findById(req.params.id);
    const post = await Posts.update(req.params.id, req.body);
    console.log(postId); 
    const { title, contents } = req.body;
    if (!postId.length) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else if (!title || !contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    } else {
      res.status(200).json({ post });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be modified.' });
  }
});

module.exports = router;
