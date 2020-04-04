const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()


const fruit = {
  "name":"banana",
  "price":250
}

    app.use(cors())
    app.use(bodyParser.json())

    
//Database connection 
const uri = process.env.DB_PATH;
//Database connection end




    //get
    app.get('/product',  (req, res) => {
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("myData").collection("product");
        collection.find().toArray((err,documents) =>{  
          if(err){
            console.log("data",err); 
          }else{
            res.send(documents) 
            console.log(documents.length);
          }
        })
        client.close();
      });
      })


    //post
    app.post('/addProduct', (req,res)=>{
      const product = req.body 
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("myData").collection("product");
        collection.insert(product,(err,result) =>{  
          if(err){
            console.log("data",err); 
          }else{
            res.send(result.ops[0]) 
            console.log("data",result);
          }
        })
        client.close();
      });

    })
    //post order
    app.post('/placeOrder', (req,res)=>{
      const orderDetails = req.body 
      orderDetails.orderTime = new Date()
      console.log(orderDetails);
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("myData").collection("order");
        collection.insertOne(orderDetails,(err,result) =>{  
          if(err){
            console.log("data",err); 
          }else{
            res.send(result.ops[0]) 
            console.log("data",result);
          }
        })
        client.close();
      });

    })



    app.get('/fol',  (req, res) => {
      res.send(fruit)
    })



  app.get('/product/:key',  (req, res) => {
      const key = req.params.key

      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("myData").collection("product");
        collection.find({key}).toArray((err,documents) =>{  
          if(err){
            console.log("data",err); 
          }else{
            res.send(documents[0]) 
          }
        })
        client.close();
      });
    })


  app.post('/getProductsByKey',  (req, res) => {
      const key = req.params.key
      const productKey = req.body 
      console.log(productKey);
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("myData").collection("product");
        collection.find({ key: { $in: productKey } }).toArray((err,documents) =>{  
          if(err){
            console.log("data",err); 
          }else{
            res.send(documents) 
          }
        })
        client.close();
      });
    })




  const port = process.env.PORT || 3100
  app.listen(port, ()=> console.log("listening to app " + port))