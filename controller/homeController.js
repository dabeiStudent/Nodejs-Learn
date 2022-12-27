var getHomepage = (req, res) => {
    return res.render('index.ejs')
}

var getKevin = (req, res) => {
    return res.render('kevin.ejs')
}

module.exports = {
    getHomepage, getKevin
}