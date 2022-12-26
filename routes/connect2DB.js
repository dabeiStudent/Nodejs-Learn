const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const connect2DB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:Landeptrai780@lantndmernstack.witoqky.mongodb.net/?retryWrites=true&w=majority`)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('CAN NOT connect to MongoDB');
    }
}

module.exports = connect2DB;