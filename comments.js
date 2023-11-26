// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting comments.',
        error: err
      });
    }
    return res.json(comments);
  });
});

// Get single comment by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting comment.',
        error: err
      });
    }
    if (!comment) {
      return res.status(404).json({
        message: 'No such comment'
      });
    }
    return res.json(comment);
  });
});

// Create comment
router.post('/', function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Error saving comment',
        error: err
      });
    }
    return res.json({
      message: 'saved',
      _id: comment._id
    });
  });
});

// Update comment
router.put('/:id', function(req, res) {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Error updating comment',
        error: err
      });
    }
    return res.json({
      message: 'updated',
      _id: comment._id
    });
  });
});

// Delete comment
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Comment.remove({
    _id: id
  }, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: 'Error deleting comment',
        error: err
      });
    }
    return res.json({
      message: 'deleted',
      _id: comment._id
    });
  });
});

module.exports = router;