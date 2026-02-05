import express from "express";

const app = express();

const PORT = 3000;

//"Middlewear" that allows express to read
//form data and store it in req.body
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
//create temp array to store orders
const orders = [];

//Home Page
app.get("/", (req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});
//contact us form
app.get("/contact-us", (req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});
//Submit response
app.post("/submit-order", (req,res)=>{
    //{"fname":"z","lname":"z","email":"z","method":"delivery","size":"medium","comment":"","Discounts":"Yes"}
    //create JSON object to store order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        toppings: req.body.toppings ? req.body.toppings: "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    }
    //push orders
    orders.push(order);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//contact us form
app.get("/admin", (req,res)=>{
    res.send(orders);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});