const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = 3000;
app.use(express.json());

// Connect to DB
connectDB();

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Product Service MVC</h1>");
});

app.use("/shopApi", productRoutes );

app.use(errorHandler);

app.listen(port,()=>console.log(`Server is listening at http://localhost:${port}`));