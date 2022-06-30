const mongoose = require("mongoose");

const UserFoundationSchema = new mongoose.Schema(
  {
    foundationName: {
      type: String,
      required: true,
    },
    petsForAdoption:{
        type: [Object],
    },
    internUsers: {
      type: [Object],
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description:{
        type: String,
    },
    email:{
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);



const UserFoundation = mongoose.model("UserFoundation", UserFoundationSchema);

module.exports = UserFoundation;
