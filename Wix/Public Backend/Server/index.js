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
		clientId: "a9d65fbdc535425c99ad3e06fe119727",
		clientSecret: "8c59f3427ea3471490332bcdb9fdcadd",
		redirectUri: "http://localhost:9000/",
	});
	// var spotifyApi = new SpotifyWebApi({
	// 	clientId: "7f393f8e4a94403d8879987a0cf76a27",
	// 	clientSecret: "450d7255b78242388d5734459c13a855",
	// 	redirectUri: "http://localhost:9000/",
	// });

	spotifyApi.setAccessToken(
		"BQAoBaLvnf0ikkutIF4rchOH6KBku-w4I46-CGs_0k0YS15Awgc-Kk-1Yz0zCFeiWSIErQkk2AHFWjrTd7i7d-qrsFlHZk71IkhS9ZiGygQ7WkqJR3lbo9oWEOcdFkmHs3YciM4xE6n6gW2p6GddwlSd46vkRKdZZcm7WCvnoPhMPfpBT6MAx3QVo8cwghRm_wh2Wop7jK76kgcjruAm9XNVSkUMJFdrVEf8dENh7E8p",
	);

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
