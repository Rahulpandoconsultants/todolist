const db = require("../db/database");


exports.createDB = (req, res) => {
    let q = "CREATE DATABASE Todo_list";
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("Db created")
    })
}

//CREATE table

exports.createTable = (req, res) => {
    let q = "CREATE TABLE todos (id INT AUTO_INCREMENT, tasks VARCHAR(50))";
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("Db created")
    })
}

//Create list
exports.createList = (req, res) => {
    let q = "INSERT INTO todos SET ?";
    const {tasks}  = req.body;
    db.query(q, {tasks}, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    })
}

//show todos
exports.showtodo = (req, res) => {
    let q = "SELECT * FROM todos";
    
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    })
}

//show single todo
exports.showsingletodo = (req, res) => {
    let q = `SELECT * FROM todos  WHERE id=${req.params.id}`;
    
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result[0]);
    })
}

//Update single todo
exports.updateList = (req, res) => {
    const {tasks}  = req.body;
    let q = `UPDATE todos SET ? WHERE id=${req.params.id} `;
    
    db.query(q, {tasks}, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    })
}

//delete single todo
exports.deletesingletodo = (req, res) => {
    let q = `DELETE FROM todos WHERE id=${req.params.id}`;
    
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({data: "todo deleted"});
    })
}


