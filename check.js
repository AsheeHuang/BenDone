var passCheck = true;

// ask permission from user
if (Notification.permission !== 'granted') {
	Notification.requestPermission().then(function (permission) {
		if (permission === 'granted') {
            console.log("Success");
		} else {
            passCheck = false;
        }
	});
}

// check user has already login
var body = document.documentElement.innerHTML
if (body.includes('請登入')) {
    alert("Please login before polling start");
    passCheck = false;
}

if (passCheck) {
    window.close();
}
