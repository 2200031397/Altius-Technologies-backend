const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customer');

// Hardcoded secret key for demonstration purposes; replace or use an env variable in production.
const secretKey = 'your_jwt_secret_key'; 

const getCustomers = async (req, res) => {
  try {
    // Fetch customers with the role 'Customer'
    const customers = await Customer.find({ role: 'Customer' });
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newCustomer.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getCustomers };
