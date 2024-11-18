const Ticket = require('../models/ticket');

const createTicket = async (req, res) => {
  try {
    const { title } = req.body;
    const customerName = req.user.role; // Assuming the user info is stored in the token payload

    const newTicket = new Ticket({
      title,
      customerName, // You can also add customerId to associate the ticket with the user
      lastUpdatedOn: Date.now()
    });

    await newTicket.save();
    res.status(201).send({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).send({ error: error.message });
  }
};


const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ lastUpdatedOn: -1 });
    res.status(200).send(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);  // Check the console for more details
    res.status(500).send({ error: error.message });
  }
};


const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updatedData = req.body;
    updatedData.lastUpdatedOn = Date.now();
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true, runValidators: true });
    res.status(200).send(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).send({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    await Ticket.findByIdAndDelete(ticketId);
    res.status(200).send({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createTicket, getAllTickets, updateTicket, deleteTicket };
