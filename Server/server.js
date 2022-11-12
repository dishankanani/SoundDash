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

app.post("/getCurrentPlayingTrack", async (req, res) => {
	// Get Users Current Playing Track
	spotifyApi.getMyCurrentPlayingTrack().then(
		function (data) {
			fs.writeFile(
				"assets/currentPlaying.json",
				JSON.stringify(data.body),
				function (err) {
					console.log(err);
				},
			);

			return res.status(200).json({
				message: "Current playing track!",
				data: data.body,
			});
		},
		function (err) {
			console.log("Something went wrong!", err);
		},
	);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
