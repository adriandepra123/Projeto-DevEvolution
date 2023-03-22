const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a single order by id
router.get('/:id', orderController.getOrderById);

// Update a order by id
router.put('/:id', orderController.updateOrder);

// Delete a order by id
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
