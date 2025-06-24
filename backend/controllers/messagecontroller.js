const Message = require('../models/Message');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  
  try {
    const message = new Message({
      sender: req.user.id,
      receiver,
      content
    });
    
    await message.save();
    
    // Emit via Socket.IO
    const io = req.app.get('socketio');
    io.to(receiver).emit('newMessage', message);
    io.to(req.user.id).emit('newMessage', message);
    
    res.status(201).json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get messages for a user
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
        $or: [
          { sender: req.user.id },
          { receiver: req.user.id }
        ]
      })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  sendMessage,
  getMessages
};