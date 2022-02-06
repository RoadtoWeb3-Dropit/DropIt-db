/**
 * This file is our model. We define what exactly we will put into our MongoDB database.
 *
 * In this exercise, we will create a user schema that will represent a single user. The single user object will have two attributes: a username and age
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TODO #6 Add an additional attribute representing the user age.
// TODO #7 Set the appropriate  data type for age. (ie. Number)

// trim is whitespace at end - if include whitespace it gets trimmed off
const dropSchema = new Schema(
  {
    organizerWallet: {
      type: String,
      required: true
    },
    registeredWallets: {
      type: [String],
      required: true
    },
    dropStatus: {
      type: Boolean,
      required: true
    },  
    id: {
      type: String,
      unique: true,
      required: true
    },
    metadata: {
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      imgLink: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true,
  }
);

const Drop = mongoose.model("Drop", dropSchema);
module.exports = Drop;
// get drops by creator 
// get all drops
// add drop 