module.exports.connectDB = async () => {
    // Importing Required Modules
    const mongoose = require('mongoose');
    // Connecting To The Database
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected To MongoDb Successfully....');
    }catch(err){
        console.log('Connection Failed To MongoDb', err)
        process.exit(1);
    };
};
