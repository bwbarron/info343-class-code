
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");
    var snapshot = document.querySelector("img");
    var context = canvas.getContext("2d");
    var videoStream;
    var mouseIsDown = false;

    navigator.getUserMedia({video: true/*, audio: true*/}, function (stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function (error) {console.error(error);});

    video.addEventListener("click", function () {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            context.drawImage(video, 0, 0);
        }
    });

    canvas.addEventListener("mousedown", function (event) {
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop + window.scrollY;
        context.beginPath();
        context.moveTo(x, y);
        mouseIsDown = true;
    });

    canvas.addEventListener("mousemove", function (event) {
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop + window.scrollY;
        if (mouseIsDown) {
            context.lineTo(x, y);
            context.stroke();
        }
    });

    canvas.addEventListener("mouseup", function (event) {
        mouseIsDown = false;
    });

    document.querySelector("#btn-snapshot").addEventListener("click", function () {
        snapshot.src = canvas.toDataURL();
    });

});

