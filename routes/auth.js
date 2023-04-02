const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//hash function
const argon2 = require('argon2');
const bodyParser = require('body-parser');

router.use(express.json())
router.use(cookieParser())
router.get('/', (req, res) => {
    res.send('user')
});

router.post('/signup', async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if (repassword != password)
        return res.status(400).send({ succes: false, message: "Confirmpassword doesnot match" })
    if (!username || !password)
        return res.status(400).send({ success: false, message: 'Missing username or password' });
    try {
        const userDuplicate = await user.findOne({ username: username })
        if (userDuplicate) {
            return res.status(400).send({ success: false, message: 'Username is already exist' });
        }
        else {
            const hashPassword = await argon2.hash(password);
            user.create({
                username: username,
                password: hashPassword
            })
                .then(data => {
                    if (data) {
                        return res.status(200).send({ success: true, message: 'Successfully signup' });
                    }
                })
                .catch(err => {
                    return res.status(400).send(err);
                })
        }
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Server disrupted' });
    }
});

router.post('/login', async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password)
        return res.status(400).send({ success: false, message: 'Missing username or password' });
    try {
        const validUser = await user.findOne({ username })
        if (!validUser)
            return res.status(400).send({ success: false, message: 'Incorrect username or password' });
        const validPassword = await argon2.verify(validUser.password, password)
        if (!validPassword)
            return res.status(400).send({ success: false, message: 'Incorrect username or password' });

        const token = jwt.sign({ id: validUser._id }, 'mk');

        res.cookie("token", token, {
            httpOnly: true
        })
        return res.status(200).send({ success: true, message: 'Logged in', token: token, user: validUser });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});

router.get('/homeprofile/', (req, res, next) => {
    try {
        var token = req.cookies.token
        const rs = jwt.verify(token, 'mk')
        req.data = rs.id
        if (rs) {
            next()
        }
    } catch (error) {
        return res.json('mk sai')
    }
}, (req, res, next) => {
    var userId = req.data
    user.find({
        _id: userId
    })
        .then(data => {
            return res.json({ username: data[0].username, id: data[0]._id, password: data[0].password })
        })
        .catch(err => {
            return res.json(err)
        })
})

module.exports = router;

//Tim hieu ve token, session de xac thuc dang nhap