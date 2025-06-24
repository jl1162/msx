const User = require('../models/User');

// @desc    Update user balance
// @route   PUT /api/balance/:userId
// @access  Private/Admin
exports.updateBalance = async (req, res) => {
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
    const notification = {
      message: `Your balance was updated by $${amount}. New balance: $${user.balance}`,
      date: new Date()
    };
    
    user.notifications.push(notification);
    await user.save();
    
    // Emit real-time notification via Socket.IO
    const io = req.app.get('socketio');
    io.to(userId).emit('balanceUpdate', {
      balance: user.balance,
      notification
    });
    
    res.json({
      message: 'Balance updated successfully',
      balance: user.balance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};