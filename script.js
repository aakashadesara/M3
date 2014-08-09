$(document).ready(function () {
// Song array
var songArray = [
    "sound/track1.mp3",
    "sound/track2.mp3",
    "sound/track3.mp3",
    "sound/track4.mp3",
    "sound/track5.mp3",
    "sound/track6.mp3",
    "sound/track7.mp3",
    "sound/track8.mp3",
    "sound/track9.mp3",
    "sound/track10.mp3",
    "sound/track11.mp3",
    "sound/track12.mp3",
    "sound/track13.mp3",
    "sound/track14.mp3",
    "sound/track15.mp3",
    "sound/track16.mp3"
];

var nameArray = [
    "Somewhere Over the Rainbow",
    "Slay It",
    "Bangarang",
    "Bang!",
    "Can't Tell Me Nothing",
    "Come With Me Now",
    "Dragon Rider",
    "Elements",
    "Happy",
    "Incredible",
    "One Tribe",
    "Rap God",
    "Pentonix",
    "Turn Down For What",
    "21 Guns",
    "Titanium"
];

var toggleLeftVolume = false;
var toggleRightVolume = false;
var toggleLeftButtonVolume;
var toggleRightButtonVolume;

var turnTableLeftText;
var turnTableRightText;

var audio1 = songArray[0];
var audio2 = songArray[0];

var audioNotSetYet = "";
var nameOfAudioNotSetYet = "None";
var buttonSelector = "";

var leapx;
var leapy;
var currentPoseSentinal;

// var left/right table (true = left, false = right)
var leftOrRightTable;

// Left table vars
var lplaying = false;


// Right table vars
var rplaying = false;

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

 $("#splashIcon").fadeOut(3000);
 $("#splashScreen").fadeOut(6000);



        gesture = document.getElementById("gesture");
        xPosDiv = document.getElementById("leap-x");
        yPosDiv = document.getElementById("leap-y");

        toggleLeftButtonVolume = document.getElementById("volumeToggleLeft");
        toggleRightButtonVolume = document.getElementById("volumeToggleRight");

        var rightTable = document.getElementById("rightTable");
        var leftTable = document.getElementById("leftTable");

        turnTableLeftText = document.getElementById("turnTableLeftText");
        turnTableRightText = document.getElementById("turnTableRightText");

        var looper = setInterval(djLooper(), 100);




var i = 0;

var ypos;


hub.on('pose', function(pose) {
    currentPose = pose;
    
        switch(currentPose.type) {
            case currentPose.POSE_FIST:
                gesture.innerHTML = ("Gesture: Fist");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_FIST;

                if(leftOrRightTable){
                    if(toggleLeftVolume == false){
                        toggleLeftVolume = true;
                        console.log("TLeft: true");
                        toggleLeftButtonVolume.style.backgroundColor = "#00DDEE";
                    } else if(toggleLeftVolume == true){
                        toggleLeftVolume = false;
                        console.log("TLeft: false");
                        toggleLeftButtonVolume.style.backgroundColor = "white";
                    }
                } else {
                    if(toggleRightVolume == false){
                        toggleRightVolume = true;
                        console.log("TRight: true");
                        toggleRightButtonVolume.style.backgroundColor = "#00DDEE";
                    } else if (toggleRightVolume == true){
                        toggleRightVolume = false;
                        console.log("TRight: false");
                        toggleRightButtonVolume.style.backgroundColor = "white";
                    }
                }
                
                break;
            case currentPose.POSE_WAVE_IN:
                gesture.innerHTML = ("Gesture: Wave in");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_WAVE_IN;

                i--;
                if(i < 0){
                    i = 15;
                }

                buttonSelector = "song" + (i + 1);

                unClearAllButtons();
                document.getElementById(buttonSelector).style.backgroundColor = "white";
                document.getElementById(buttonSelector).style.color = "black";

                audioNotSetYet = songArray[i];
                nameOfAudioNotSetYet = nameArray[i];

                break;
            case currentPose.POSE_WAVE_OUT:
                gesture.innerHTML = ("Gesture: Wave out");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_WAVE_OUT;

                    i++;
                    if(i > 15){
                        i = 0;
                    }

                    buttonSelector = "song" + (i + 1);

                    unClearAllButtons();
                    document.getElementById(buttonSelector).style.backgroundColor = "white";
                    document.getElementById(buttonSelector).style.color = "black";

                    audioNotSetYet = songArray[i];
                    nameOfAudioNotSetYet = nameArray[i];

                break;
            case currentPose.POSE_FINGERS_SPREAD:
                gesture.innerHTML = ("Gesture: Fingers spread");
                if(currentPose != currentPoseSentinal)
                    currentPoseSentinal = currentPose.POSE_FINGERS_SPREAD;

                if(leftOrRightTable){
                    if(lplaying){
                        console.log("Left music stopped");
                        turnMusicLeft(false, "");
                        lplaying = !lplaying;
                        document.getElementById("turnTableImgLeft").src = "img/stillLeft.png";
                    } else {
                        console.log("Left music started");
                        audio1.pause();
                        turnMusicLeft(true, audioNotSetYet);
                        turnTableLeftText.innerHTML = nameOfAudioNotSetYet;
                        lplaying = !lplaying;
                        document.getElementById("turnTableImgLeft").src = "img/fastSpin.gif";
                    }
                } else if (leftOrRightTable == false ){
                    if(rplaying){
                        console.log("Right music stopped");
                        turnMusicRight(false, "");
                        rplaying = !rplaying;
                        document.getElementById("turnTableImgRight").src = "img/stillRight.png";
                    } else {
                        console.log("Right music started");
                        turnMusicRight(true, audioNotSetYet );
                        turnTableRightText.innerHTML = nameOfAudioNotSetYet;
                        rplaying = !rplaying;
                        document.getElementById("turnTableImgRight").src = "img/fastSpin.gif";
                    }
                }

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
      ypos = frame.hands[0].palmPosition[1]/200 - .15;

      xPosDiv.innerHTML = "Leap X: (" + Math.round((frame.hands[0].palmPosition[0]/1000 * 10))/1 + ")"; 
      yPosDiv.innerHTML = "Leap Y: (" + frame.hands[0].palmPosition[1]/200 + ")"; 

      leapx = Math.round((frame.hands[0].palmPosition[0]/1000 * 10))/10;
     } else {
      xpos = 0;
    } 

    if(ypos > 0.999){
        ypos = 0.999;
    }
    if(ypos < 0.001){
        ypos = 0;
    }

    if(toggleRightVolume == true && audio2 != null){
        audio2.volume = ypos;
    }
    if(toggleLeftVolume == true && audio1 != null){
        audio1.volume = ypos;
    }
   

    djLooper();


});


function djLooper(){
    if(ypos > 0.999){
        ypos = 1;
    } 
    if(ypos < 0.001){
        ypos = 0;
    }

    if(leapx >= 0){
        console.log("hi");
        rightTable.style.backgroundColor="#00FFFF";
        leftTable.style.backgroundColor="white";
        leftOrRightTable = false;
    } else if (leapx < 0){
        leftTable.style.backgroundColor="#00FFFF";
        rightTable.style.backgroundColor="white";
        leftOrRightTable = true;
    
    } else {
        leftTable.style.backgroundColor="white";
        rightTable.style.backgroundColor="white";
    }
}

turnMusicLeft(true, audio1);


function turnMusicLeft(bool, audio){
    if(bool){
        audio1 = new Audio();
        audio1.src = audio;
        audio1.play();
    } else {
        audio1.pause();
    }
}

function turnMusicRight(bool, audio){
    if(bool){
        audio2 = new Audio();
        audio2.src = audio;
        audio2.play();
    } else {
        audio2.pause();
    }
}

function unClearAllButtons(){
    for(var i = 1; i < 17; i++){
        document.getElementById("song" + i).style.backgroundColor = "#00FFFF";
        document.getElementById("song" + i).style.color = "white";
    }
}
});