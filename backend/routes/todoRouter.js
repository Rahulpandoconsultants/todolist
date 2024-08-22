const express= require('express');
const { createDB, createTable, createList, showtodo, deletesingletodo, showsingletodo, updateList } = require('../controllers/todoControllers');
const router= express.Router();


//ROUTES

router.get('/create/database',createDB);
router.get('/create/table',createTable);
router.post('/create/list',createList);
router.get('/show/todos',showtodo);
router.get('/show/todos/:id',showsingletodo);
router.put('/update/todos/:id',updateList);
router.delete('/delete/todos/:id',deletesingletodo);
module.exports=router;