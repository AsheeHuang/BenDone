var monitorSwitch = document.getElementById('monitorSwitch');
var monitorStatus = false;

chrome.storage.sync.get('turnOn', function(data) {
	monitorStatus = data.turnOn
	monitorSwitch.checked = data.turnOn;
	print(monitorStatus);
});


monitorSwitch.onclick = function(element) {
	monitorStatus = !monitorStatus;
	chrome.storage.sync.set({turnOn: monitorStatus}, function() {
		monitorSwitch.checked = monitorStatus;
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
