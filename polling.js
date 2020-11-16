// ask permission from user
if (Notification.permission === 'granted') {
	Notification.requestPermission().then(function (permission) {
		if (permission == 'granted') {
			console.log("Success");
		}
	});
}

// Find keyword
var body = document.documentElement.innerHTML
if (body.includes('已開放店家')) {
	// Notification
	notify = new Notification("Dinner is coming");
	// Action
	// close monitor
	chrome.storage.sync.set({turnOn: false});
} else {
	// close tab
	window.close();
}

