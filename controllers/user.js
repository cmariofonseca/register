const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userCtrl = {};

userCtrl.createUser = async (req, res) => {
  await User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) { // If there is more than one user with the same email
      return res.json({ message: 'Mail exists' });
    } else {
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
          return res.json({ error: error })
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save().then(reuslt => {
            res.json({
              message: 'Created user successfullly'
            });
          }).catch(error => {
            res.json({
              error: error
            });
          });
        }
      });
    }
  }).catch(error => {
    res.json({
      error: error
    });
  });
};

userCtrl.deleteUser = async (req, res) => {
  console.log(req.body);
  await User.findOneAndDelete(req.params.id).then(result => {
    res.json({
      message: 'Deleted user!'
    });
  }).catch(error => {
    res.json({
      error: error
    });
  });
};

userCtrl.createLogin = async (req, res) => {
  await User.find({ email: req.body.email }).then(user => {
    if (user.length < 1) {
      return res.json({ message: 'Auth failed' });
    }
    bcrypt.compare(req.body.password, user[0].password, (error, result) => {
      if (error) {
        return res.json({ message: 'Auth failed' });
      }
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, 'secret', { expiresIn: '1h' }); // Secret key
        return res.json({
          message: 'Auth successful',
          token: token
        });
      }
      res.json({ message: 'Auth failed' });
    });
  }).catch(error => {
    res.json({
      error: error
    });
  });
};

module.exports = userCtrl;