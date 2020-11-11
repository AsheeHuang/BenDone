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
});
