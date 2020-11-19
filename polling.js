var webhookurl = "https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=XXXXXXXXXXXXXXXXXXX"

// Find keyword
var body = document.documentElement.innerHTML
if (body.includes('已開放店家')) {
	// Notification
	notify = new Notification("Dinner is coming");
	// Send to Synology chat
	var msg = parseOrderMsg(body);
	sendNotify2SynoChat(msg);

	// TODO : Auto Order
	
	// close monitor
	chrome.storage.sync.set({turnOn: false}, function() {
		console.log("Turn off monitor")
	});
} else {
	window.close();
}

function parseOrderMsg(body) {
	msg = ""
	choice = document.getElementsByClassName('card-content');

	for (i = 0 ; i < choice.length; i++) {
		msg = msg + choice[i].innerText.replace(/\n/g, " ") + "\n";
	}
	msg += "<https://dinner.synology.com/dinner/order|點餐GoGoGo!>"
	return msg
}

function sendNotify2SynoChat(msg) {
	payload = {
		text: msg
	}
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
	url = new URL(webhookurl);
	url.searchParams.append('payload', JSON.stringify(payload))

	xmlhttp.open("POST", url.toString());
	xmlhttp.send({});
}
