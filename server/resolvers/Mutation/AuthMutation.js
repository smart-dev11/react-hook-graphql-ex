"use strict";
var bcrypt = require("bcrypt-nodejs");
var _ = require("lodash");

const User = require("../../models/user");

const signUp = async (parent, args, context) => {
  try {
    var user = new User(args);
    user.password = bcrypt.hashSync(args.password, bcrypt.genSaltSync(8), null);
    await user.save();
    return {
      _id: user._id,
      email: user.email,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const logIn = async (parent, args, context) => {
  try {
    const user = await User.findOne({ email: args.email });
    if (user.validPassword(args.password)) {
      return {
        _id: user._id,
        email: user.email,
      };
    } else {
      return "Password is wrong";
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  signUp,
  logIn,
};
