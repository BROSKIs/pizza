import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";

//Load enviroment variables from .env
dotenv.config();

const app = express();

const PORT = 3000;

//Set EJS as the view engine
app.set("view engine", "ejs");

//"Middlewear" that allows express to read
//form data and store it in req.body
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
//create temp array to store orders
const orders = [];

//DATABASE 
//create a pool bucket of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();


app.get('/db-test', async(req, res)=>{
    try{
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    }catch(err){
        console.error("Database error: ", err);
    }
});

//Home Page
app.get('/', (req,res)=>{
    res.render("home");
});
//contact us form
app.get("/contact-us", (req,res)=>{
    res.render("contact")
});
//Submit response
app.post("/submit-order", async (req,res)=>{
    //{"fname":"z","lname":"z","email":"z","method":"delivery","size":"medium","comment":"","Discounts":"Yes"}
    //create JSON array to store order data
    const order = req.body;

    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        Array.isArray(order.toppings) ? order.toppings.join(", ") : "none"
    ]

    const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings) VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params);
    //push orders
    orders.push(order);
    res.render("confirmation", { order });
});

//contact us form
app.get("/admin", async (req,res)=>{
    //Read all orders from database
    //newest first
    let sql = "SELECT * FROM orders ORDER BY timestamp DESC";
    const orders = await pool.query(sql);

    res.render("admin", { orders:orders[0] });
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});