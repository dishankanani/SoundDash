const express = require("express");

const app = express();

app.get("/", (req, res) => {
	return res.status(200).json({
		message: "Welcome to our Do-Re-MiHacks!",
	});
});

app.post("/help", (req, res) => {
	return res.status(200).json({
		message:
			"We will help you! Please Do send us an email at help@gmail.com",
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
