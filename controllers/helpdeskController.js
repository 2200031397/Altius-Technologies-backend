const Ticket = require('../models/ticket');

const createTicket = async (req, res) => {
  try {
    const { title, noteContent } = req.body; 
    const customerName = req.user.name; 
    const customerRole = req.user.role; 

    const newTicket = new Ticket({
      title,
      customerName, 
      customerRole, 
      lastUpdatedOn: Date.now(),
      notes: noteContent
        ? [{ content: noteContent, addedBy: customerName }] 
        : []
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
    console.error('Error fetching tickets:', error);  
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


const getCustomerTickets = async (req, res) => {
  try {
    const customerName = req.user.name; 
    const tickets = await Ticket.find({ customerName }).sort({ lastUpdatedOn: -1 });
    res.status(200).send(tickets);
  } catch (error) {
    console.error('Error fetching customer tickets:', error);
    res.status(500).send({ error: error.message });
  }
};

const addNoteToTicket = async (req, res) => {
  try {
    const ticketId = req.params.id; 
    const { content } = req.body;  
    const addedBy = req.user.name; 
    const customerRole=req.user.role
   
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }

   
    ticket.notes.push({ content, addedBy,customerRole, timestamp: Date.now() });

    
    ticket.lastUpdatedOn = Date.now();

    
    await ticket.save();

    res.status(200).send({ message: 'Note added successfully', notes: ticket.notes });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createTicket, getAllTickets, updateTicket, deleteTicket, getCustomerTickets, addNoteToTicket };
