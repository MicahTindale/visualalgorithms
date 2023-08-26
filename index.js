const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;




app.set("view engine", "ejs");

app.use(express.static("public"));


app.get("/", (req, res) => {
	res.render("pages/home");
});
app.get("/selectionsort", (req, res) => {
	res.render("pages/improved_selection_sort");
});
app.get("/kruskals", (req, res) => {
	res.render("pages/kruskals_algorithm_improved");
});

app.listen(port, ()=>{
	console.log("Listening on port: " + port);
});