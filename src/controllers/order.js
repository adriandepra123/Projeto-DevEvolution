const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { customerName, productName, quantity, price } = req.body;

        const order = await Order.create({ customerName, productName, quantity, price });

        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { customerName, productName, quantity, price } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { customerName, productName, quantity, price },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
