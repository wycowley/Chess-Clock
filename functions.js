var blackTime
var whiteTime
var paused
var turn
var startTime = 0
var increment = 0
var stoppingVar
function start(){
    paused = true;
    document.getElementById("complete-viewport").style.display = "inline";
    document.getElementById("set-up-screen").style.display = "none";
    document.getElementById("whiteVisual").style.display = "none";
    document.getElementById("blackVisual").style.display = "none";


    console.log(document.getElementById("minutesTime").value)

    var minutes = parseInt(document.getElementById("minutesTime").value)
    var seconds = parseInt(document.getElementById("secondsTime").value)
    var incrementValue = parseInt(document.getElementById("secondsIncrement").value)

    // checks if anything is actually entered, and if not gives a default value
    if(Number.isNaN(minutes)){
        minutes = 0
    }
    if(Number.isNaN(seconds)){
        seconds = 0
    }
    if(Number.isNaN(incrementValue)){
        console.log("Yes, it is not a numbers")
        incrementValue = 0;
    }
    startTime = minutes * 60 + seconds
    if(startTime==0){
        startTime = 600;
    }
    increment = incrementValue;
    
    turn = "white"
    whiteTime = startTime
    blackTime = startTime
    renderTime()
    stoppingVar = setInterval(decreaseTime,100);
    document.getElementById("pauseContainer").style.display = "inline";
    document.getElementById("pauseButton").src = "Images/play.svg";


}
function stop(){
    document.getElementById("complete-viewport").style.display = "none";
    document.getElementById("set-up-screen").style.display = "inline";
    clearInterval(stoppingVar);
    document.getElementById("black").className = document.getElementById("black").className.replace("turnRed", " ");
    document.getElementById("black").className = document.getElementById("black").className.replace("turnGreen", " ");
    document.getElementById("white").className = document.getElementById("white").className.replace("turnRed", " ");
    document.getElementById("white").className = document.getElementById("white").className.replace("turnGreen", " ");

    document.getElementById("stopButton").style.marginLeft = "5vw";

}
function pause(){
    if(paused == false){
        paused = true;
        document.getElementById("pauseButton").src = "Images/play.svg";
    }
    else{
        paused = false;
        document.getElementById("pauseButton").src = "Images/pause.svg";
        if(turn=="white"){
            document.getElementById("whiteVisual").style.display = "inherit";        
        }else{
            document.getElementById("blackVisual").style.display = "inherit";

        }

    }
}
function decreaseTime(){
    if(paused == false){
        if(turn == "white"){
            whiteTime = whiteTime - .1
        }else{
            blackTime = blackTime - .1

        }
        renderTime();
    }
}

function renderTime(){
    document.getElementById("whiteText").style.textDecoration = "none"
    document.getElementById("blackText").style.textDecoration = "none"

    console.log("white: "+Math.round(whiteTime*10)/10+" black: "+Math.round(blackTime*10)/10);

    if(whiteTime<20){
        document.getElementById("whiteText").style.textDecoration = "underline"
        document.getElementById("whiteText").innerHTML = Math.round(whiteTime*10)/10;
        if(Math.round(whiteTime*10)/10==Math.round(whiteTime)){
            document.getElementById("whiteText").innerHTML = Math.round(whiteTime*10)/10+".0";
        }

    }else if(Math.ceil(whiteTime)<60){
        document.getElementById("whiteText").innerHTML = Math.round(whiteTime);
    }else{
        document.getElementById("whiteText").innerHTML = Math.floor(whiteTime/60)+":"+Math.round(whiteTime % 60)
        if(Math.round(whiteTime % 60)<10){
            document.getElementById("whiteText").innerHTML = Math.floor(whiteTime/60)+":"+"0"+Math.round(whiteTime % 60)
        }
    }

    if(blackTime<20){
        document.getElementById("blackText").style.textDecoration = "underline"
        document.getElementById("blackText").innerHTML = Math.round(blackTime*10)/10;
        if(Math.round(blackTime*10)/10==Math.round(blackTime)){
            document.getElementById("blackText").innerHTML = Math.round(blackTime*10)/10+".0";
        }

    }else if(Math.ceil(blackTime)<60){
        document.getElementById("blackText").innerHTML = Math.round(blackTime);
    }else{
        document.getElementById("blackText").innerHTML = Math.floor(blackTime/60)+":"+Math.round(blackTime % 60)
        if(Math.round(blackTime % 60)<10){
            document.getElementById("blackText").innerHTML = Math.floor(blackTime/60)+":"+"0"+Math.round(blackTime % 60)
        }
    }
// Checks if time is actually up
    if(Math.round(blackTime*10)/10==0){
        paused = true;
        document.getElementById("pauseContainer").style.display = "none";
        document.getElementById("black").className = document.getElementById("black").className + " turnRed"
        document.getElementById("white").className = document.getElementById("white").className + " turnGreen"

        document.getElementById("stopButton").style.marginLeft = "40vw";
    }
    if(Math.round(whiteTime*10)/10==0){
        paused = true;
        document.getElementById("pauseContainer").style.display = "none";
        document.getElementById("black").className = document.getElementById("black").className + " turnGreen"
        document.getElementById("white").className = document.getElementById("white").className + " turnRed"
        
        document.getElementById("stopButton").style.marginLeft = "40vw";
    }
}
function blackDone(){
    document.getElementById("pauseContainer").className = document.getElementById("pauseContainer").className.replace("highlight", " ");

    if(!paused && turn=="black"){
        turn = "white";
        document.getElementById("whiteVisual").style.display = "inherit";
        document.getElementById("blackVisual").style.display = "none";
        blackTime = blackTime+increment;
    }else if(paused){
        document.getElementById("pauseContainer").className = document.getElementById("pauseContainer").className + " highlight" 
    }
}
function whiteDone(){
    document.getElementById("pauseContainer").className = document.getElementById("pauseContainer").className.replace("highlight", " ");

    if(!paused && turn=="white"){
        turn = "black";
        document.getElementById("whiteVisual").style.display = "none";
        document.getElementById("blackVisual").style.display = "inherit";
        whiteTime = whiteTime+increment;
    }else if(paused){
        document.getElementById("pauseContainer").className = document.getElementById("pauseContainer").className + " highlight" 
    }
    
}