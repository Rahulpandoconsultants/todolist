const  mysql = require("mysql");

const connection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"todotask"
});

connection.connect(function(error){
    if(error)throw error;
    console.log("Connected to database");})
    
module.exports=connection;