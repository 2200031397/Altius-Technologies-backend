const express = require('express');
const authController = require('../controllers/authController');
const helpdeskController = require('../controllers/helpdeskController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Authentication Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ticket Routes with Role-Based Access
router.post('/tickets', authenticateToken, authorizeRoles('Customer', 'Agent', 'Admin'), helpdeskController.createTicket);
router.get('/tickets', authenticateToken, authorizeRoles('Agent', 'Admin'), helpdeskController.getAllTickets);
router.put('/tickets/:id', authenticateToken, authorizeRoles('Agent', 'Admin'), helpdeskController.updateTicket);
router.delete('/tickets/:id', authenticateToken, authorizeRoles('Admin'), helpdeskController.deleteTicket);
router.get('/customers',authenticateToken, authorizeRoles('Admin'), authController.getCustomers);

module.exports = router;
