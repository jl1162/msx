const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { items } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let total = 0;
    const orderItems = [];
    
    // Validate each item and calculate total
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for: ${product.name}` });
      }
      
      total += product.price * item.quantity;
      orderItems.push({
        product: item.product,
        quantity: item.quantity
      });
      
      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }
    
    // Check user balance
    if (user.balance < total) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Deduct balance
    user.balance -= total;
    await user.save();
    
    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      total
    });
    
    await order.save();
    
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username').populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createOrder,
  getOrders
};