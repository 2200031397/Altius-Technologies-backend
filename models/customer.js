const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Agent', 'Admin'], default: 'Customer' },
  createdOn: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
