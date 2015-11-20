/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission() {
        Notification.requestPermission(function (result) {
            if (result === "granted") {
                showNotification("Thanks bitch", "Now you will see notifications");
            }
        });
    }

    function showNotification(title, body) {
        var notification = new Notification(title, {
            body: body,
            icon: "img/notification.png"
        });
        window.setTimeout(notification.close.bind(notification), 3000);
    }

    var triggerBtn = document.getElementById(("trigger"));
    triggerBtn.addEventListener("click", function () {
        switch(Notification.permission) {
            case "granted":
                showNotification("Hello", "triggered at " + new Date().toLocaleTimeString());
                break;
            case "denied":
                alert("Please enable notifications");
                break;
            default:
                askPermission();
        }
    });

});
