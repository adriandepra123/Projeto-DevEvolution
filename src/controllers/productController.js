const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.status(201).json(product);
        } catch (err) {
            return res.status(400).json({ error: 'Error creating product' });
        }
    },

    async list(req, res) {
        try {
            const products = await Product.find();
            return res.json(products);
        } catch (err) {
            return res.status(400).json({ error: 'Error listing products' });
        }
    },

    async update(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.json(product);
        } catch (err) {
            return res.status(400).json({ error: 'Error updating product' });
        }
    },

    async delete(req, res) {
        try {
            await Product.findByIdAndRemove(req.params.id);
            return res.json({ message: 'Product successfully deleted' });
        } catch (err) {
            return res.status(400).json({ error: 'Error deleting product' });
        }
    },
};
