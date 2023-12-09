import express from "express";
import connectDB from "./config/db.js";
import cors from 'cors';
import collection from "./Schema/LoginSchema.js"
import flightBookCollection from './Schema/FlightsBookSchema.js'
import trainBookCollection from "./Schema/TrainBookSchema.js";
import hotelBookCollection from "./Schema/HotelBookSchema.js";
import cabBookCollection from "./Schema/CabBookSchema.js";
import generateAuthToken from './Schema/LoginSchema.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import MongoStore from 'connect-mongo'
import Redis from 'ioredis'
import RedisStore from "connect-redis"

const app= express();
app.use(express.json());

// const redisClient=Redis.createClient({
//     port:6379,
//     host:'localhost'
//     // enable_offline_queue: false
// })

// redisClient.on("connect",()=>{
//     console.log("connected to redis")
// })
// redisClient.on("error",()=>{
//     console.log("error of redis connection")
// })

// const redisStore=new RedisStore({
//     client:redisClient
// })
// const MongoDBStore = connectMongoDBSession(session);

// const store = new MongoDBStore({
//     uri: 'mongodb+srv://esehi:react@cluster0.lfyoq9r.mongodb.net/',
//     collection: 'sessions'
//   });
  
//   // Catch errors in the MongoDBStore
//   store.on('error', (error) => {
//     console.error('MongoDBStore Error:', error);
//   });
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
//middle ware
app.use(cors({
    origin: function (origin, callback) {
        // Check if the request origin is in the allowedOrigins array
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));

//creating sesion
app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://esehi:react@cluster0.lfyoq9r.mongodb.net/',
        collectionName:'user sessions',
      }),
    secret:"youraresecretkeytomyserveronlydontdiscloseyourselfsamjhi",
    saveUninitialized:false,
    resave:false,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:1000*60*30,
        sameSite:'none'
    }
}));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

connectDB(process.env.USERNAME , process.env.PASSWORD);

app.get("/",cors(),(req,res)=>{
    // cookie access krni h getcookie krke
})

app.post("/",(req,res)=>{
   
})


//for login backend 
app.get("/signin",cors(),(req,res)=>{
    const sess=req.session.user;
    res.send('welcome'+sess)
})

app.post("/signin",async(req,res)=>{
    // console.log(req.body);
    const {username,email,password,phoneNumber}=req.body
    try{
        const check=await collection.findOne({email:email}) //if user exists or not
        if(check){
            const isPwdMatch=bcrypt.compare(password,check.password)
            if(isPwdMatch){
                req.session.user=check
                req.session.loggedIn=true

                // console.log('req.session' , req.session);

                const token= await check.generateAuthToken(); //creating token
                // console.log("Token",token);

                //now ham cookie create kr rhe hai jo ki person ka session ka data store krega browser pr dikhane ke liye
                // res.cookie('jwtAuth', token, {
                // expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true,
                //     secure: false, //secure: process.env.NODE_ENV === 'production'
                //     sameSite: 'none',
                // });
                res.send(req.session.user)
                console.log("cookie created");
                // console.log(req.body.username);
            }
            else{
                console.log("pwd not match")
            }
        }
        else{
            res.json("not exist")
        }
    }
    catch(e){
        console.log("tokenerror",e);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// fetch('http://localhost:8000', {  //fetching data from backend  for frontend
//   method: 'GET',
//   credentials: 'include',
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));

//for sigup backend
app.get("/signup",cors(),(req,res)=>{

})

app.post("/signup",async(req,res)=>{
    console.log(req.body)
    const { username,email , password ,phoneNumber}=req.body
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const data={
            username:username,
            email:email,
            password:hashedPassword,
            phoneNumber:phoneNumber
        }
        const check=await collection.findOne({email:email})

        if(check){
            // alert("User already exists....")
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(e){
        console.log(e);
    }
})

//for flight booking
app.get("/flightbooking",cors(),(req,res)=>{

})

app.post("/flightbooking",async(req,res)=>{
    // console.log(req.body);

    const {category,fromCity,fromCity1,destination,destination1,flight,departureDate,returnDate}=req.body;

    const data={
        category:category,
        fromCity:fromCity,
        fromCity1:fromCity1,
        destination:destination,
        destination1:destination1,
        flight:flight,
        departureDate:departureDate,
        returnDate:returnDate
    }

    try{
        await flightBookCollection.insertMany([data])
        const allData=await flightBookCollection.find({})
        res.json(allData)
    }
    catch(e){
        res.json("fail")
        console.log(e);
    }
})


//for train booking
app.get("/trainbooking",cors(),(req,res)=>{

})

app.post("/trainbooking",async(req,res)=>{
    // console.log(req.body);

    const {category,fromCity,destination,travelDate,trainNumber,seatingClass}=req.body;
    console.log(req.body)
    const data={
        category:category,
        fromCity:fromCity,
        destination:destination,
        travelDate:travelDate,
        trainNumber:trainNumber,
        seatingClass:seatingClass
    }

    try{
        await trainBookCollection.insertMany([data])
        // const allData=await trainBookCollection.find({})
        // res.json(allData)
    }
    catch(e){
        // res.json("fail")
        console.log(e);
    }
})

//for hotel booking
app.get("/hotelbooking",cors(),(req,res)=>{

})

app.post("/hotelbooking",async(req,res)=>{
   console.log(req.body);

    const {category,location,checkinDate,checkoutDate,rooms,price}=req.body;

    const data={
        category:category,
        location:location,
        checkinDate:checkinDate,
        checkoutDate:checkoutDate,
        rooms:rooms,
        price:price
    }

    try{
        await hotelBookCollection.insertMany([data])
        // const allData=await flightBookCollection.find({})
        // res.json(allData)
    }
    catch(e){
        res.json("fail")
        console.log(e);
    }
})

//for cab booking
app.get("/cabbooking",cors(),(req,res)=>{

})

app.post("/cabbooking",async(req,res)=>{
   console.log(req.body);

    const {category,fromCity,destination,departureDate,returnDate,pickupTime}=req.body;

    const data={
        category:category,
        fromCity:fromCity,
        destination:destination,
        departureDate:departureDate,
        returnDate:returnDate,
        pickupTime:pickupTime
    }

    try{
        await cabBookCollection.insertMany([data])
        // const allData=await flightBookCollection.find({})
        // res.json(allData)
    }
    catch(e){
        res.json("fail")
        console.log(e);
    }
})

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

  
  
const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));