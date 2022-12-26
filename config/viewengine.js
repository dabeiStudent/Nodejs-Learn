const express = require('express');

const configViewengine = (app) => {
    app.use(express.static('./public'));
    app.set("view engine", "ejs");
    app.set("views", "./views");
}

export default configViewengine;