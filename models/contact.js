const mongoose = require("mongoose");

const ContactSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
      },

      phone: {
        type: String,
        required: true,
        minlength: 11,
      },

      message: {
        type: String,
        required: true,
        minlength: 5,
      },
    },
    { timestamps: true }
  );

module.exports =
  mongoose.model(
    "Contact",
    ContactSchema
  );