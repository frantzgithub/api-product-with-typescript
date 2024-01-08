import express from "express";
import { isIdValid, isNameValid } from "./middlewares";
import { allProducts, create, deleteProduct, singleProduct, updateProduct } from "./logics";

const app = express();

app.use(express.json());

// routes

app.get('/products', allProducts);
app.get('/products/:id', isIdValid, singleProduct);
app.post('/products', isNameValid, create);
app.patch('/products/:id', isIdValid, isNameValid, updateProduct);
app.delete('/products/:id', isIdValid, deleteProduct);

app.listen(3000, () => {
    console.log("app is listening in port 3000")
})