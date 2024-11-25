const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_PATH,{useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log("Error while connecting to MongoDB:",err);
});

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server listening on http://localhost:${process.env.SERVER_PORT}`);
});

const UsersSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
},
{timestamps : true});

UsersSchema.pre("save", async function(next){
    console.log("Pre-Save hook: Hashing password before saving the user.");
    this.password = `hashed_${this.password}`;
    next();
});

UsersSchema.post("save", async function(doc,next){
    console.log(`Post-Save hook: User ${doc.name} saved successfully`);
    next();
});

UsersSchema.pre("findOneAndDelete", async function(next){
    const user = await this.model.findOne(this.getQuery());
    console.log(`Pre-findOneAndDelete hook: Preparing to delete ${user.name} user.`);
    next();
});

UsersSchema.post("findOneAndDelete", async function(doc,next){
    console.log(`Post-findOneAndDelete hook: User ${doc.name} saved successfully`);
    next();
});

const UserModel = mongoose.model("user",UsersSchema);

app.get("/getUsers",async(req,res)=>{
    try{
        const users = await UserModel.find();
        res.status(200).json({
            users
        });
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.post("/addUser",async(req,res) => {
    try{
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).send(`User ${newUser.name} has been created successfully`);
    }
    catch(e){
        console.log("Error while adding user:",e);
        res.status(400).send(e);
    }
});
app.delete("/deleteUser/:id",async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.id);
        if(!user){
            return res.status(404).send("User not found.");
        }
        await UserModel.findOneAndDelete(req.params.id);
        res.send(`User ${user.name} deleted successfully`);
    }
    catch(e){
        console.log("Error while adding user:",e);
        res.status(400).send(e);
    }
});