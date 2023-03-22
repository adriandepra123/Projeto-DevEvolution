const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/create-initial', async (req, res) => {
    const initialProducts = [
        { name: 'Camiseta long', description: '100% algodão', price: 100.00, quantity: 15 },
        { name: 'Bermuda Jeans', description: 'inficado para festa e eventos', price: 40.00, quantity: 20 },
        { name: 'Bermuda banho', description: 'indicado para piscina', price: 25.00, quantity: 10},
    ];
    try {
        await Product.insertMany(initialProducts);
        return res.status(201).json({ message: 'Produtos criados com sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao criar produtos iniciais' });
    }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'não deu boa', err});
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), getProduct, (req, res) => {
    res.json(res.product);
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Produto removido' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.product = product;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
