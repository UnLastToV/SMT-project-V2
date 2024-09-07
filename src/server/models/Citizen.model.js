const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CitizenSchema = new Schema({
  citizenID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  licenseID: {
    type: String,
    required: true
  },
  carType: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  breakRule: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Citizen', CitizenSchema);