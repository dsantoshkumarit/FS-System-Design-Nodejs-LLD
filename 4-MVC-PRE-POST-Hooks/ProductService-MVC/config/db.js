const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_PATH,{useNewUrlParser : true, useUnifiedTopology: true});
        console.log("MongoDB connected...");
    }
    catch(e){
        console.log("MongoDB connection error:",e);
        process.exit(1);
    }
};

module.exports = connectDB;