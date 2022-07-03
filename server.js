const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs")
const app = express();
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signin = require("./controllers/signin");



//USING KNEX FOR THE DATABASE------------------
const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432, //THIS IS NOT 3001!!!!!!! CHANGE IT TO THE PORT OF THE DATABASE
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });




//USE EXPRESS.JS----------------------------------------------
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
  




//Sign-in Code using POST
// ----------------------------------------------------
app.post("/signin", (req,res) => { signin.handleSignin (req, res, db, bcrypt) })

//Register Code using POST
app.post("/register", (req,res) => { register.handleRegister(req, res, bcrypt, db) })

//Profile Code using GET
app.get("/profile/:id", (req,res) => { profile.handleProfileGet(req,res,db) })

//Image Code using PUT
app.put("/image", (req,res) => { image.handleImage(req, res, db) })

//Image API Call using POST
app.post("/imageurl", (req,res) => { image.handleApiCall(req, res) })




app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
  })


  /* CREATE TABLE login(
    id serial PRIMARY KEY,
    hash varchar(100) NOT NULL,
    email text UNIQUE NOT NULL
); 


CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);


original PGAdmin Post: 5432



*/