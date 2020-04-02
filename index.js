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
const pass = process.env.DB_PASS
const user = process.env.DB_USER
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
        collection.insertOne(product,(err,result) =>{  
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

  const name = ["Babu","Nasir","Nbk","Rakib"]
  app.get('/user/:id',  (req, res) => {
      const id = req.params.id
      const user = name[id]
      res.send({id,user})
    })




  const port = process.env.PORT || 3100
  app.listen(port, ()=> console.log("listening to app " + port))