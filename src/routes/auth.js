const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../auth/jwt');

const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    newUser.save()
        .then(() => res.status(201).json({ message: 'Usuário criado com sucesso' }))
        .catch((err) => res.status(400).json({ message: 'Erro ao criar usuário', error: err }));
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return next(err);
            }
            const token = generateToken(user);
            return res.status(200).json({ token });
        });
    })(req, res, next);
});

 module.exports = router;


