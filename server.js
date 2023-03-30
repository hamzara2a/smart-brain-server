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
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });




//USE EXPRESS.JS----------------------------------------------
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
  



app.get("/", (req,res) => { res.send("it is working!") })

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




app.listen(3000, ()=> {
  console.log('app is running on port 3000');
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