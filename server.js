const express = require("express");
require('dotenv').config();

const conn = require("./config/dbConfig");
const bodyParser = require("body-parser");
const userRoute = require("./Route/UserRoute.js");
const createTableQuery = require("./config/table.js");

// conn.query(createTableQuery, (err, result) => {
//     if (err) {
//         console.error('Error creating table:', err);
//     } else {
//         console.log('Table created successfully');
//     }
// });


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",userRoute)

app.listen(4000,(req,res,next)=>{
    console.log("SERVER CREATED SUCCESSFULLY");
})

conn.connect((err)=>{
    if(err){
        console.log("CONNECTION ESTABLISHED")
    }else{
        console.log('ISSUE IN CONNECTION')
        
    }
})