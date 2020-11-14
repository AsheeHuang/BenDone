var monitorSwitch = document.getElementById('monitorSwitch');
var monitorStatus = false;

chrome.storage.sync.get('turnOn', function(data) {
	monitorStatus = data.turnOn
	monitorSwitch.style.backgroundColor = monitorStatus ? "#3aa757" : "#FF0000";
	print(monitorStatus);
});


monitorSwitch.onclick = function(element) {
	monitorStatus = !monitorStatus;
	chrome.storage.sync.set({turnOn: monitorStatus}, function() {
		monitorSwitch.style.backgroundColor = monitorStatus ? "#3aa757" : "#FF0000";
		print(monitorStatus);
	})
};

// For debug usage
function print(str){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'console.log(' + str + ')'});
	});
}
