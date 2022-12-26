const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken')

//hash function
const argon2 = require('argon2');

router.get('/', (req, res) => {
    res.send('user')
});

router.post('/signup', async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    try {
        const userDuplicate = await user.findOne({ username: username })
        if (userDuplicate) {
            return res.status(400).json({ success: false, message: 'Username is already exist' });
        }
        else {
            const hashPassword = await argon2.hash(password);
            user.create({
                username: username,
                password: hashPassword
            })
                .then(data => {
                    if (data) {
                        const token = jwt.sign({ userId: data._id }, process.env.ACCESS_TOKEN);
                        return res.status(200).json({ success: true, message: 'Successfully signup', token: token });
                    }
                })
                .catch(err => {
                    return res.status(400).json(err);
                })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server disrupted' });
    }
});

router.post('/login', async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    try {
        const validUser = await user.findOne({ username })
        if (!validUser)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });
        const validPassword = await argon2.verify(validUser.password, password)
        if (!validPassword)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });
        const token = jwt.sign({ userId: validUser._id }, process.env.ACCESS_TOKEN);
        return res.status(200).json({ success: true, message: 'Logged in', token: token });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server disrupted' });
    }
});

router.get('/showUser', async (req, res, next) => {
    var result = await user.find();
    return res.send(result);
})
module.exports = router;