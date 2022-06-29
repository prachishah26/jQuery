// defining the video element
const video = document.getElementById('video')

// load models and start the video
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
]).then(startVideo)

video.addEventListener('play', () => {
    /*
     when video play 
     */
    const canvas = faceapi.createCanvasFromMedia(video)   //creating canvas
    document.body.append(canvas) //appending to html
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)   //to match the dimension
    setInterval(async () => {
        /*
        setInterval will update the landmarks and bounding box points after 100ms.
         */
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()   //detect landmarks and bounding box points

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)   //draw bounding box on canvas
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)   //draw face landmarks on canvas

        leftEyePosition();
        rightEyePosition();
        
        //euclideanDistance between two eyes to measure distance between camera and person..if euclidean distance is more then person is near and if it is less then person is far.
        const distanceBetweenEyes = faceapi.euclideanDistance([leftEyeXAxis, leftEyeYAxis], [rightEyeXAxis, rightEyeYAxis]);

        // console.log(distanceBetweenEyes);
    }, 100)
})

function startVideo() {
    /*
     to start video 
     */
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

async function leftEyePosition() {
    /*
     taking points of lefteye's position and taking first landmark 
     */
    const landmarks = await faceapi.detectFaceLandmarks(video)
    const leftEye = landmarks.getLeftEye();
    leftEyeXAxis = leftEye[0]._x;
    leftEyeYAxis = leftEye[0]._y;
}

async function rightEyePosition() {
    /*
     taking points of righteye's position and taking first landmark 
     */
    const landmarks = await faceapi.detectFaceLandmarks(video)
    const rightEye = landmarks.getRightEye();
    rightEyeXAxis = rightEye[0]._x;
    rightEyeYAxis = rightEye[0]._y;
}

//colors of landmarks are set into face-api.js in line nunber: from 2733 to 2739
// Nose color : Blue 
// Lips color : Red 
// eye color : white
// eyebrow color : Black