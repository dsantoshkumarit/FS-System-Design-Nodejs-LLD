const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.SERVER_PORT;

//Mongodb path : mongodb+srv://dsantoshkumarit:<db_password>@cluster0.z4wde.mongodb.net/<collection_name>?retryWrites=true&w=majority&appName=Cluster0
mongoose
    .connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database successfully. "))
    .catch((error)=>console.log("Database connection error:",error));

const productSchema = new mongoose.Schema(
    {
        product_name : {type : String, required:true},
        product_price : {type : String, required:true},
        isInStock : {type : Boolean, required:true},
        category : {type : String, required:true},
    },
    {timestamps : true}
);

const productModel = mongoose.model("Product",productSchema);

const errorHandler = (err,req,res,next) =>{
    res.status(res.statusCode || 404).json({message : err.message});
};

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to shop</h1>");
});

app.get("/shop/getAllProducts",async(req,res,next)=>{
    try{
        const allProducts = await productModel.find();
        const html = `
            ${
                allProducts.map(product => 
                    `<div>
                        <ul>
                            <li>${product.product_name}</li>
                            <li>${product.product_price}</li>
                            <li>${product.category}</li>
                            <li>${product.isInStock}</li>
                        </ul>
                    </div>`
                ).join("")
            }
        `;
        res.send(html);
    }
    catch(error){
        next(error);
    }
});
app.post("/shop/addProduct",async(req,res,next)=>{
    try{
        const {product_name,product_price,isInStock, category} = req.body;
        const product = await productModel.create({
            product_name,product_price,isInStock, category
        });
        res.status(200).json({message: "Product Added", product});
        /* Sample response:
            {
                "message": "Product Added",
                "product": {
                    "product_name": "Iphone 16",
                    "product_price": "100000",
                    "category": "electronics/mobiles",
                    "_id": "6702cb113dbe194cdac791ab",
                    "createdAt": "2024-10-06T17:38:25.243Z",
                    "updatedAt": "2024-10-06T17:38:25.243Z",
                    "__v": 0
                }
            }
         */
    }
    catch(error){
        next(error);
    }
});

app.patch("/shop/updateProduct/:id",async(req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndUpdate(
            id, req.body
        );
        if(!product){
            res.status(404);
            throw new Error("Product not found");
        }

        //to get updated product details after update.
        const updatedProduct = await productModel.findById(id);
        res.status(200).json({message: "Product Updated", updatedProduct});
        /* Sample response:
            {
                "message": "Product Updated",
                "product": {
                    "_id": "6702cfbd869b108c2262e9e3",
                    "product_name": "Iphone 15",
                    "product_price": "90000",
                    "isInStock": true,
                    "category": "electronics/mobiles",
                    "createdAt": "2024-10-06T17:58:21.479Z",
                    "updatedAt": "2024-10-06T17:58:21.479Z",
                    "__v": 0
                }
            }
         */
    }
    catch(error){
        next(error);
    }
});

app.delete("/shop/deleteProduct/:id",async(req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error("Product not found");
        }
        res.status(200).json({message: "Product Deleted"});
        /* Sample response:
            {
                "message": "Product deleted"
            }
         */
    }
    catch(error){
        next(error);
    }
});

app.use(errorHandler);

app.listen(port, ()=>console.log(`Server listening on port...${port}`));