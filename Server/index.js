var SpotifyWebApi = require("spotify-web-api-node");
var fs = require("fs");

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

// create a Playlist
spotifyApi
	.createPlaylist("Dorimi", {
		description: "My description",
		public: true,
	})
	.then(
		function (data) {
			console.log("Playlist created: ", data.body.id);
		},
		function (err) {
			console.log("Something went wrong!", err);
		},
	);
