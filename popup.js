let monitorSwitch = document.getElementById('monitorSwitch');
let monitorStatus = false; // false means off
monitorSwitch.style.backgroundColor = monitorStatus ? "#3aa757" : "#FF0000";

monitorSwitch.onclick = function(element) {
	toggleSwitch();
};

function toggleSwitch() {
	monitorStatus = !monitorStatus;
	chrome.storage.sync.set({turnOn: monitorStatus}, function() {
		monitorSwitch.style.backgroundColor = monitorStatus ? "#3aa757" : "#FF0000";
	})
}

function print(str){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'console.log(' + str + ')'});
	});
}
