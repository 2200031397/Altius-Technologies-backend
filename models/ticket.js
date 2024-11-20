const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
  customerName: { type: String, required: true }, 
  customerRole: { type: String, required: true }, 
  lastUpdatedOn: { type: Date, default: Date.now },
  notes: [
    {
      content: String,
      addedBy: String,
      customerRole:String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
