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
			console.log("turn on ");
			var count = 0;
			var alarmInfo = {
				when: Date.now(),
				periodInMinutes : 0.1 //6 seconds
			}

			chrome.alarms.onAlarm.addListener(function(alarm){
				console.log(count++)
			});

			chrome.alarms.create('BenDone Polling', alarmInfo);
		} else {
			console.log("turn off");
			chrome.alarms.clearAll();
		}
	});
});


