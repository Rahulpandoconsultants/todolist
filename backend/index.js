// var connection=require("./Connection");
const connection=require("./db/database")
const express= require('express');
const cors= require('cors');
const bodyParser= require('body-parser')

var app=express();

app.use(bodyParser.json())
app.use(cors());

// IMport routes

const todos=require('./routes/todoRouter');

//routes middleware
app.use('/api',todos)

// app.get('/',(req,res)=>{
//     return res.json("From backend side");
//     // res.sendFile('C:/Users/rahul/my-project/src/App.jsx')
// })

// app.get('/users',(req,res)=>{
//     connection.connect(function(error){
//             if(error)throw error;
//             console.log("Connected");
//             connection.query("select * from task", function (err, data) {
//                 // if (err) throw err;
//                 // console.log(result);
//                 if(err) return res.json(err);
//                 return res.json(data)
//               });
//         })
// })
const port=7000;
app.listen(port, ()=>{
    console.log("listening")
});   

// connection.connect(function(error){
//     if(error)throw error;
//     console.log("Connected");
//     connection.query("select * from task", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//       });
// })