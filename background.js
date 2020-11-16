chrome.runtime.onInstalled.addListener(function() {
	var count = 0;
	var dinnerUrl = 'http://localhost:3001'; // localhost is temp

	chrome.storage.sync.set({turnOn: false}, function() {
	  console.log("The monitor is default off");
	});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'localhost'},
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
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

