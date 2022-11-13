/*****************
 backend/events.js
 *****************
 'backend/events.js' is a reserved Velo file that enables you to handle backend events.
 Many of the Velo backend modules, like 'wix-stores-backend' or 'wix-media-backend', include events that are triggered when
 specific actions occur on your site. You can write code that runs when these actions occur.
*******************/
export function wixMediaManager_onEventOccur(event) {
	console.log(
		'The file "' +
			event.tracks.trackId +
			'" has been added to the playlist',
	);
}
