const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const authRoutes = require("./routes/auth-routes");
const todoRoutes = require("./routes/todo-routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use((req, res, next) => {
	const error = 'can not find route';
	res.status(500).send(error);
  });
  
// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Internal server error");
});

//connect to mongoose and start app
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.adkgnlj.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
	)
	.then(
		app.listen(process.env.PORT || 5000, () => {
			console.log("server starting on port 5000");
		})
	)
	.catch((err) => {
		console.log(err);
	});
