const express= require('express');
const mongoose= require('mongoose');
const router = require("./routes/api");
const bodyParser = require("body-parser");
const dotenv= require('dotenv');


dotenv.config();
const app=express();

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:true
}

mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error: "+err);
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json())
app.use('/',router)

app.listen(process.env.PORT,()=>{
    console.log("listening")
})