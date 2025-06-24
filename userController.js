const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -notifications');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    let user = await User.findOne({ username });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    user = new User({
      username,
      password,
      role: role || 'user'
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      balance: user.balance
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getUsers,
  createUser
};