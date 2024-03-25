const express = require('express');
const router = express.Router();
const blogController = require('../controllers/post-controllers');

router.get('/', blogController.getHome);

router.get('/admin', blogController.getAdmin);

router.post('/posts', blogController.createPost);

router.get('/posts/:id/edit', blogController.getSinglePost);

router.post('/posts/:id/edit', blogController.updatePost);

router.post('/posts/:id/delete', blogController.deletePost);

module.exports = router;
