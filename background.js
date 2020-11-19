chrome.runtime.onInstalled.addListener(function() {
	var count = 0;
	var dinnerUrl = 'https://dinner.synology.com/dinner/order';
	//var dinnerUrl = 'http://localhost:3001';

	chrome.storage.sync.set({turnOn: false}, function() {
	  console.log("The monitor is default off");
	});

	chrome.alarms.onAlarm.addListener(function(alarm){
		console.log(count++);
		chrome.tabs.create({index: 0, url: dinnerUrl, active: false, pinned: true}, function(tab) {
			chrome.tabs.executeScript(tab.id, {file: 'polling.js'});
		})
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) { 
		if(changes.turnOn.newValue === true) {
			console.log("Polling turn on ");
			var now  = new Date();
			var startingTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 50, 0, 0);
			var alarmInfo = {
				when: startingTime.getTime(),
				periodInMinutes : 1
			}
			chrome.alarms.create('BenDone Polling', alarmInfo);

			//check polling is available
			chrome.tabs.create({index: 0, url: dinnerUrl, active: true}, function(tab) {
				chrome.tabs.executeScript(tab.id, {file: 'check.js'});
			})
			alert(startingTime > now ? "Polling will be started at " + startingTime.toLocaleString() : "Start polling");
		} else {
			count = 0;
			chrome.alarms.clearAll();
			console.log("Polling turn off");
		}
	});
});

