const express = require("express");
const app = express();
const port = 3002;

const loggerMiddleware = (req,res,next)=>{
    console.log(`${new Date()} --- request [Method : ${req.method}, Url : ${req.url}]`);
    next();
};

const authMiddleware = (req,res,next)=>{
    const {password} = req.query;
    if(password !== "123"){
        return res.status(401).json({message:"Invalid password entered."})
    }
    console.log(`Authenticated Successfully.`);
    next();
};

app.use(loggerMiddleware);

//====== Static file response - Url to use : http://localhost:3002/index.html
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send("Middleware Server.");
});

app.get("/getUsers",authMiddleware, (req,res)=>{
    res.json({message:"Users List."});
});

app.listen(port,()=>console.log(`Middleware Server listening at http://localhost:${port}`));