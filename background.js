chrome.runtime.onInstalled.addListener(function() {
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

	chrome.storage.onChanged.addListener(function(changes, namespace) { 
		if(changes.turnOn.newValue === true) {
			console.log("Polling turn on ");
			var count = 0;
			var alarmInfo = {
				when: Date.now(),
				periodInMinutes : 0.1 //6 seconds
			}

			chrome.alarms.onAlarm.addListener(function(alarm){
				console.log(count++)
				// TODO
				// Refresh this tab
				// Find keyword
				// Notification
				// Action
			});

			chrome.alarms.create('BenDone Polling', alarmInfo);
		} else {
			console.log("Polling turn off");
			chrome.alarms.clearAll();
		}
	});
});

