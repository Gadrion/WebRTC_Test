'use strict';

var videoLocal, videoRemote;
var btnLocalVideoOpen, btnLocalVideoClose, btnRemoteVideoOpen;

function Init() {
    videoInit();
    btnInit();
};

function videoInit() {
    videoLocal = document.getElementById("videoLocal");
    videoRemote = document.getElementById("videoRemote");
};

function btnInit() {
    btnLocalVideoOpen = document.getElementById("btnLocalVideoOpen");
    btnLocalVideoClose = document.getElementById("btnLocalVideoClose");
    btnRemoteVideoOpen = document.getElementById("btnRemoteVideoOpen");
    btnLocalVideoClose.disabled = true;
    btnRemoteVideoOpen.disabled = true;
}

var constraints = {
  audio: false,
  video: true
};

function LocalVideoOpen() {
    navigator.mediaDevices.getUserMedia(constraints)
                          .then(LocalVideoOpenSuccess)
                          .catch(LocalVideoOpenError);
}

function LocalVideoOpenSuccess(stream) {
    console.log(`LocalVideoOpenSuccess()---------`);
    btnLocalVideoOpen.disabled = true;
    btnLocalVideoClose.disabled = false;
    // btnRemoteVideoOpen.disabled = true;
    videoLocal.srcObject = stream;
}

function LocalVideoOpenError(error) {
    alert(`LocalVideoOpenError => ${error}`);
}

function LocalVideoClose() {
    btnLocalVideoOpen.disabled = false;
    btnLocalVideoClose.disabled = true;
    var track = videoLocal.srcObject.getTracks()[0];      
    track.stop();
    videoLocal.srcObject = null;
}