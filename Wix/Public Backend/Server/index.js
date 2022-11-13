const fs = require("fs");

(async () => {
	// let clientId = $w("#input8").value;
	// let clientSecret = $w("#input9").value;
	// let accessToken = $w("#input10").value;
	await handleSpotifyAPI();
})();

// Click "Run", or Preview your site, to execute your code

async function handleSpotifyAPI() {
	var SpotifyWebApi = require("spotify-web-api-node");

	// credentials are optional
	var spotifyApi = new SpotifyWebApi({
		clientId: "",
		clientSecret: "",
		redirectUri: "http://localhost:9000/",
	});

	spotifyApi.setAccessToken("");

	var playlistID;
	var listOfSongs = [];

	// Get a playlist

	async function getCurrentTrackAndAddToPlayList(playlistID) {
		spotifyApi.getMyCurrentPlayingTrack().then(
			function (data) {
				fs.writeFile(
					"currentPlaying.json",
					JSON.stringify(data.body),
					function (err) {
						console.log(err);
					},
				);
				// console.log("Now playing: " + data.body.item.name);
				console.log("Now playing: " + data.body.item.uri);

				// check if listOfSongs contains data.body.item.uri

				var currentSong = [];

				listOfSongs.includes(data.body.item.uri)
					? console.log("Already in list")
					: listOfSongs.push(data.body.item.uri),
					currentSong.push(data.body.item.uri);

				spotifyApi.addTracksToPlaylist(playlistID, currentSong).then(
					function (data) {
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
	}

	spotifyApi
		.createPlaylist("Dorimi", {
			description: "My description",
			public: true,
		})
		.then(
			function (data) {
				fs.writeFile(
					"createdPlaylist.json",
					JSON.stringify(data.body),
					function (err) {
						console.log(err);
					},
				);
				playlistID = data.body.id;
				setInterval(
					() => getCurrentTrackAndAddToPlayList(playlistID),
					10000,
				);
			},
			function (err) {
				console.log("Something went wrong!", err);
			},
		);
}
