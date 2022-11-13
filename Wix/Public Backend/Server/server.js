const express = require("express");
var SpotifyWebApi = require("spotify-web-api-node");
var fs = require("fs");

const app = express();

// credentials for the spotify api
var spotifyApi = new SpotifyWebApi({
	clientId: "",
	clientSecret: "",
	redirectUri: "http://localhost:9000/",
});

// set access token
spotifyApi.setAccessToken("");

var playlistID;
var listOfSongs = [];

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

app.post("/create-playlist", async (req, res) => {
	// create a Playlist
	spotifyApi
		.createPlaylist(req.body.playlistName, {
			description: req.body.playlistDescription,
			public: true,
		})
		.then(
			function (data) {
				fs.writeFile(
					"assets/createdPlaylist.json",
					JSON.stringify(data.body),
					function (err) {
						console.log(err);
					},
				);

				console.log("Playlist created: ", data.body.id);
				return res.status(200).json({
					message: "Playlist created!",
					data: data.body,
				});
			},
			function (err) {
				console.log("Something went wrong!", err);
				return res.status(500).json({
					message: "Something went wrong!",
					error: err.message,
				});
			},
		);
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

app.post("/addTrackToPlaylist", async (req, res) => {
	spotifyApi.getMyCurrentPlayingTrack().then(
		function (data) {
			fs.writeFile(
				"currentPlaying.json",
				JSON.stringify(data.body),
				function (err) {
					console.log(err);
				},
			);

			var currentSong = [];

			listOfSongs.includes(data.body.item.uri)
				? console.log("Already in list")
				: listOfSongs.push(data.body.item.uri),
				currentSong.push(data.body.item.uri);

			spotifyApi
				.addTracksToPlaylist(req.body.playlistID, currentSong)
				.then(
					function (data) {
						fs.writeFile(
							"assets/addedTracks.json",
							JSON.stringify(data.body),
							function (err) {
								console.log(err);
							},
						);
						console.log("Added tracks to playlist!");
					},
					function (err) {
						console.log("Something went wrong!", err);
					},
				);
		},
		function (err) {
			console.log("Something went wrong!", err);
		},
	);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
