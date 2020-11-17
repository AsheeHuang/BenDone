chrome.runtime.onInstalled.addListener(function() {
	var count = 0;
	var dinnerUrl = 'https://dinner.synology.com/dinner/order'; // localhost is temp

	chrome.storage.sync.set({turnOn: false}, function() {
	  console.log("The monitor is default off");
	});

	chrome.alarms.onAlarm.addListener(function(alarm){
		console.log(count++);
		chrome.tabs.create({index: 0, url: dinnerUrl, active: false}, function(tab) {
			chrome.tabs.executeScript(tab.id, {file: 'polling.js'});
		})
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) { 
		if(changes.turnOn.newValue === true) {
			console.log("Polling turn on ");
			var alarmInfo = {
				when: Date.now(),
				periodInMinutes : 0.15 //9 seconds
			}
			chrome.alarms.create('BenDone Polling', alarmInfo);
		} else {
			count = 0;
			chrome.alarms.clearAll();
			console.log("Polling turn off");
		}
	});
});

