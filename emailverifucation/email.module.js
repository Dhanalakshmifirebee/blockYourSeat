const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const verifySchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: String,
  message: String,
  mobile: Number,
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("requestdemo", verifySchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required()
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};