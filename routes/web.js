import express from "express";
let router = express.Router();

const initWebroute = (app) => {
    router.get('/', (req, res) => {
        res.render('index.ejs');
    })
    router.get('/kevinfan', (req, res) => {
        res.render('kevin.ejs');
    })
    return app.use('/', router)
}

module.exports = initWebroute;