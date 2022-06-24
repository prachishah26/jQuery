var videoCapture;
const vid = document.querySelector('video');
$(document).ready(function () {
    videoCapture = document.getElementById('capturevideo');
});

$(document).on('click', '#btnActivateCamera', function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // access video stream from webcam
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            // on success, stream it in video tag 
            window.localStream = stream;
            videoCapture.srcObject = stream;
            videoCapture.play();
            activateCamera();
        }).catch(e => {
            // on failure/error, alert message. 
            alert("Please Allow: Use Your Camera!");
        });
    }
});

$(document).on('click', '#btnDeactivateCamera', function () {
    // stop video streaming if any
    localStream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
            deactivateCamera();
        }
    });
});

$(document).on('click', '#btnCapture', function () {
    document.getElementById('capturecanvas').getContext('2d').drawImage(videoCapture, 0, 0, 230, 230);
});

start()

async function start() {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
        // or 'base/node_modules/@mediapipe/face_mesh' in npm.
    };
    detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

    const estimationConfig = { flipHorizontal: false };
    const faces = await detector.estimateFaces(videoCapture, estimationConfig);

    console.log(faces);
}




function activateCamera() {
    $("#btnActivateCamera").hide();
    $("#btnDeactivateCamera, #capturevideo, #btnCapture, #capturecanvas ").show();
}

function deactivateCamera() {
    $("#btnDeactivateCamera, #capturevideo, #btnCapture, #capturecanvas ").hide();
    $("#btnActivateCamera").show();
}