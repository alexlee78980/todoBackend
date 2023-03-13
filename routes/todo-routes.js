const express = require("express");
const Todo = require("../models/todo");
const checkAuth = require("../middleware/check-auth");
const { getTodo, queryTodo, postTodo, updateTodo, deleteTodo } = require("../controllers/todo-controller");

const router = express.Router();

// get all todo items
router.get("/todos", getTodo);

// Search for todo items based on filters
router.get("/query/:category/:description", queryTodo);

// create a new todo item
router.post("/todos", postTodo);

//Check if authenticated to run routes
router.use(checkAuth);


// patch a todo item by ID
router.patch("/todos/:id", updateTodo);

// delete a todo item by ID
router.delete("/todos/:id", deleteTodo);

module.exports = router;
