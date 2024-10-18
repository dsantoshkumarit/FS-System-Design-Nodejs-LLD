const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let usersData = [
    {
        username : "Test1",
        email : "test1@gmail.com"
    }
];

app.get('/',(req,res)=>{
    res.send("User Data CRUD Service");
});

app.get("/getUsers",(req,res)=>{
    res.json(usersData);
});

app.post("/addUser",(req,res)=>{
    const {username,email}  = req.body;
    if(!username || !email){
        return res.status(400).json({message : "Username and Email are required."})
    }
    const existingUser = usersData.findIndex(user => user.username.toLocaleLowerCase() === username.toLocaleLowerCase());
    if(existingUser !== -1){
        return res.status(409).json({message : "Username already exists."});
    }
    usersData.push({username,email});
    res.status(200).json({message: "User added successfully."});
});

app.patch("/modifyUserData",(req,res)=>{
    const {username,email}  = req.body;
    if(!username || !email){
        return res.status(400).json({message : "Username and Email are required."});
    }
    const existingUserIndex = usersData.findIndex(user => user.username.toLocaleLowerCase() === username.toLocaleLowerCase());
    if(existingUserIndex === -1){
        return res.status(404).json({message : "Username doesn't exists."});
    }
    usersData[existingUserIndex].email = email; 
    res.status(200).json({message: "User email modified successfully."});
});

app.delete("/deleteUser",(req,res)=>{
    const {username}  = req.body;
    if(!username){
        return res.status(400).json({message : "Username is required."});
    }
    const existingUserIndex = usersData.findIndex(user => user.username.toLocaleLowerCase() === username.toLocaleLowerCase());
    if(existingUserIndex === -1){
        return res.status(404).json({message : "Username doesn't exists."});
    }
    usersData = usersData.filter(user => user.username.toLocaleLowerCase() !== username.toLocaleLowerCase()); 
    res.status(200).json({message: "User deleted successfully."});
});

app.listen(port, ()=>console.log(`Server listening at http://localhost:${port}`));