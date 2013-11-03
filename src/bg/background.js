var settings = new Store("settings");


function basename(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

function status() {
	var httpGet = new XMLHttpRequest();
	
	chrome.browserAction.setBadgeText({text:'.'});
	
	httpGet.onreadychangestate = function() {
		if (this.status != 200) chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	};
	
	httpGet.onload = function() {
		var response =  eval("(" + httpGet.responseText + ')');

		var color = [
			[120, 120, 120, 255], // STATE_NONE = 0
			[0, 255, 0, 255],     // STATE_OPEN_SERIAL = 1
			[255, 255, 0, 255],   // STATE_DETECT_SERIAL = 2
			[0, 0, 255, 255],     // STATE_DETECT_BAUDRATE = 3
			[255, 0, 255, 255],   // STATE_CONNECTING = 4
			[0, 255, 0, 255],     // STATE_OPERATIONAL = 5
			[0, 255, 0, 255],   // STATE_PRINTING = 6
			[0, 0, 255, 255],   // STATE_PAUSED = 7
			[255, 0, 0, 255],   // STATE_CLOSED = 8
        	[255, 0, 0, 255],   // STATE_ERROR = 9
        	[255, 0, 0, 255],   // STATE_CLOSED_WITH_ERROR = 10
        	[255, 165, 0, 255],   // STATE_TRANSFERING_FILE = 11
		]

		chrome.browserAction.setBadgeBackgroundColor({ color: color[response.state.state] });
		//alert(response.state.state);
		if (response.state.state == 6)
			chrome.browserAction.setBadgeText({text:''+Math.round(response.progress.progress*100)+''});
		else
			chrome.browserAction.setBadgeText({text:' '});
	};
	httpGet.open('GET', 'http://' + settings.get('ip') + '/api/state?apikey=' + settings.get('apikey'));				
	httpGet.send();	
}

document.addEventListener('DOMContentLoaded', function() {
	status();
	iconFlashTimer = window.setInterval(status,3000);
});

chrome.contextMenus.create({
    title: "Nahrát do OctoPrint",
    contexts: ["link"],
    onclick: function(info, tab) {
		var httpGet = new XMLHttpRequest();
		httpGet.onload = function(e) {
			if (this.status == 200) {
				var blob = new Blob([this.response], {type: 'application/octet-stream'});
				
				var fd = new FormData();
				fd.append("apikey", settings.get("apikey"));
				fd.append("file", blob, basename(info.linkUrl) + '.stl'); // httpGet.response = blob
				
				var httpPost = new XMLHttpRequest();
				httpPost.onload = function() {
					console.log(httpPost.responseText);
				};
				httpPost.open('POST', 'http://' + settings.get("ip") + '/api/load');				
				httpPost.send(fd);
			};
			alert('Odesláno ' + this.statusText);
		};
		
        httpGet.responseType = 'blob';    // Chrome 19+
        httpGet.open('GET', info.linkUrl, true); // <-- info.srcUrl = location of image
        httpGet.send();
	}
});