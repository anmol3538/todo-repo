const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {JWT_SECRET_KEY} = require('../config/server-config')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'List'
    }
  ]
}, { timestamps: true });
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // only hash if password is new or modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    JWT_SECRET_KEY, 
    { expiresIn: '7d' } 
  );
};

module.exports = mongoose.model('User', userSchema);
