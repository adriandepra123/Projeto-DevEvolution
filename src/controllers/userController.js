const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).json({msg: 'Não foi possivel criar usuário', error: error});
    }
};
