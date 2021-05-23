const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json())
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;



app.get("/", (req, res) => {
    res.send("Hello World!");
  });


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwmgg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



  client.connect((err) => {
    const allBookings = client.db("Ferticare").collection("Bookings");   
    
    

    app.post("/addOrder", (req, res) => {
        const newBooking = req.body;
        allBookings.insertOne(newBooking).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });


  }) 

  app.listen(port, () => {});
   


