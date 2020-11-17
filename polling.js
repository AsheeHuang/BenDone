// ask permission from user
if (Notification.permission !== 'granted') {
	Notification.requestPermission().then(function (permission) {
		if (permission === 'granted') {
			console.log("Success");
		}
	});
}

// Find keyword
var body = document.documentElement.innerHTML
if (body.includes('已開放店家')) {
	// Notification
	notify = new Notification("Dinner is coming");
	// Send to Synology chat
	var msg = parseOrderMsg(body);
	//
	// Action
	// close monitor
	chrome.storage.sync.set({turnOn: false}, function() {
		console.log("Turn off monitor")
	});
} else {
	// close tab
	window.close();
}

function parseOrderMsg(body) {
	msg = ""
	choice = document.getElementsByClassName('card-content');

	for (i = 0 ; i < choice.length; i++) {
		msg = msg + choice[i].innerText.replace(/\n/g, " ") + "\n";
	}
	return msg
}

function sendNotify2SynoChat(msg) {


}
