const express = require('express');
const userController = require('./controllers/user');
const postController = require('./controllers/post');
const likeController = require('./controllers/like');
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');

const Router = express.Router();
Router.use(addModelsToRequest);

Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

// POST ROUTES  //

Router.post('/posts', postController.create);
Router.get('/posts', postController.getAllPosts);
Router.get('/posts/:id', postController.getPostsByUserId);

// LIKE ROUTES  //

Router.post('/likes', likeController.create);
Router.get('/likes/:post_id', likeController.getAllLikes);
// Router.get('/likes/:id', likeController.getLikesByUserId);

// These actions require authentication (only valid logged in users can do these things)
// The checkAuthentication middleware will only run for these specified routes.
Router.patch('/users/:id', checkAuthentication, userController.update);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;
