const Todo = require("../models/todo");
const checkAuth = require("../middleware/check-auth")

const getTodo = async (req, res) => {
	try {
		const todos = await Todo.find({});
		return res.json(todos);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
}



const queryTodo = async (req, res) => {
    try {
      const { category, description} = req.params;
  
      // Construct query object based on query parameters
      const query = {};

      //filter category if it is the string
      if (category) {
        query.category = category;
      }
      //filter description if it contains the string
      if (description) {
        query.description = new RegExp(description, 'i');
      }
  
      // Find todo items that match the query
      const todos = await Todo.find(query);
  
      return res.json(todos);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }

}

const postTodo =  async (req, res) => {
	try {
	    const { category, description, userId: created_by} = req.body;
        console.log(category, description, created_by)
		const todo = await Todo.create({ category, description, created_by });
		return res.status(201).json(todo);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}

}

const updateTodo = async (req, res) => {
	try {
		const { category, description} = req.body;
        const user = req.userData.userId;
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}
        if(todo.created_by != user){
            return res.status(403).json({ error: "User do not have access to update this todo" });
          }
		todo.category = category || todo.category;
		todo.description = description || todo.description;

		await todo.save();

		return res.json(todo);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
}

// delete a todo item by ID
const deleteTodo =  async (req, res) => {
	try {
        const user = req.userData.userId;
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}
        if(todo.created_by != user){
            return res.status(403).json({ error: "User do not have access to delete this todo" });
          }
		await Todo.findByIdAndDelete(req.params.id);

		return res.json({ message: "Todo item deleted" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "unauthorized" });
	}
}

module.exports = {getTodo, queryTodo, deleteTodo, postTodo, updateTodo}