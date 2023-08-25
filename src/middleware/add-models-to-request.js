const User = require('../db/models/user');
const Post = require('../db/models/post');
const Like = require('../db/models/like');

const addModelsToRequest = (req, res, next) => {
  req.db = {
    User, Post, Like,
  };
  next();
};

module.exports = addModelsToRequest;
