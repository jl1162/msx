 // controllers/adminController.js
const User = require('../models/User');

// @desc    Update user balance
// @route   PUT /api/admin/users/:userId/balance
// @access  Private (Admin only)
exports.updateUserBalance = async (req, res) => {
  const { amount } = req.body;
  const userId = req.params.userId;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update balance
    user.balance += parseFloat(amount);
    
    // Add notification
    user.notifications.push({
      message: `Your balance has been updated by $${amount}. New balance: $${user.balance}`,
      date: new Date()
    });
    
    await user.save();
    
    // Emit real-time notification via Socket.io
    // We'll get the io instance from the app and emit to the specific user
    const io = req.app.get('socketio');
    io.to(user._id.toString()).emit('balanceUpdate', {
      balance: user.balance,
      notification: user.notifications[user.notifications.length - 1]
    });
    
    res.json({ message: 'Balance updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
