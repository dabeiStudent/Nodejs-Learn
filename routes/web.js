import express from "express";
import homeController from "../controller/homeController"
let router = express.Router();

const initWebroute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/kevinfan', homeController.getKevin);
    return app.use('/', router)
}

module.exports = initWebroute;