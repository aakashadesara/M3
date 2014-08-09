var leapx;
var currentPoseSentinal;

// MYO Stuff
var hub = new Myo.Hub();

        hub.on('ready', function() {
            console.log("ready");
        });
        hub.on('connect', function() {
            console.log("connected!");
        });
        hub.on('frame', function(frame) {
            document.getElementById('out').innerHTML = frame.rotation;
        });
        hub.on('disconnect', function() {
            console.log("disconnect");
        });

        var currentPose, gesture;

        var xPosDiv;


window.onload = function(){

        gesture = document.getElementById("gesture");
        xPosDiv = document.getElementById("leap-x");

        var rightTable = document.getElementById("rightTable");
        var leftTable = document.getElementById("leftTable");

        var looper = setInterval(djLooper(), 100);


}



hub.on('pose', function(pose) {
    currentPose = pose;
    
        switch(currentPose.type) {
            case currentPose.POSE_FIST:
                gesture.innerHTML = ("Gesture: Fist");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_FIST;
                break;
            case currentPose.POSE_WAVE_IN:
                gesture.innerHTML = ("Gesture: Wave in");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_WAVE_IN;
                break;
            case currentPose.POSE_WAVE_OUT:
                gesture.innerHTML = ("Gesture: Wave out");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_WAVE_OUT;
                break;
            case currentPose.POSE_FINGERS_SPREAD:
                gesture.innerHTML = ("Gesture: Fingers spread");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_FINGERS_SPREAD;
                break;
            case currentPose.POSE_TWIST_IN:
                console.log("Gesture: Twist in");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_TWIST_IN;
                break;
            case currentPose.POSE_NONE:
            
        }

});

// Leap Stuff

Leap.loop(function(frame) {

    if(frame.hands.length == 1){

      xpos = Math.floor(frame.hands[0].palmPosition[0]);

      xPosDiv.innerHTML = "Leap X: (" + Math.round((frame.hands[0].palmPosition[0]/1000 * 10))/10+ ")"; 

      leapx = Math.round((frame.hands[0].palmPosition[0]/1000 * 10))/10;
     } else {
      xpos = 0;
    } 

    djLooper();


});


function djLooper(){
    if(leapx >= 0){
        console.log("hi");
        rightTable.style.backgroundColor="#00FFFF";
        leftTable.style.backgroundColor="white";
    } else if (leapx < 0){
        leftTable.style.backgroundColor="#00FFFF";
        rightTable.style.backgroundColor="white";
    } else {
        leftTable.style.backgroundColor="white";
        rightTable.style.backgroundColor="white";
    }
}
