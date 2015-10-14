"use strict";

document.addEventListener("DOMContentLoaded", function() {

    function forEachElement(collection, fn) {
        for (var i = 0; i < collection.length; i++) {
            fn(collection[i]);
        }
    }

    document.getElementById("click-me").addEventListener("click", function() {
        var alerts = document.querySelectorAll(".alert");
        forEachElement(alerts, function(alert) {
            alert.style.display = "block";
        });
    });

    var closeButtons = document.querySelectorAll(".alert .close");
    forEachElement(closeButtons, function(button) {
        button.addEventListener("click", function() {
            button.parentElement.style.display = "none";
        });
    });

});