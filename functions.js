var blackTime
var whiteTime
var paused
var turn
var startTime = 0
var increment = 0
var stoppingVar
function start(){
    paused = true;
    console.log("hi");
    document.getElementById("complete-viewport").style.display = "inline";
    document.getElementById("set-up-screen").style.display = "none";

    document.getElementById("black").style.backgroundColor = "black"
    document.getElementById("white").style.backgroundColor = "white"

    console.log(document.getElementById("minutesTime").value)
    startTime = parseInt(document.getElementById("minutesTime").value) * 60 + parseInt(document.getElementById("secondsTime").value)
    increment = parseInt(document.getElementById("secondsIncrement").value);
    
    turn = "white"
    whiteTime = startTime
    blackTime = startTime
    renderTime()
    stoppingVar = setInterval(decreaseTime,100);
    document.getElementById("pauseContainer").style.display = "inline";
    document.getElementById("pauseButton").src = "Images/play.png";


}
function stop(){
    document.getElementById("complete-viewport").style.display = "none";
    document.getElementById("set-up-screen").style.display = "inline";
    clearInterval(stoppingVar);

}
function pause(){
    if(paused == false){
        paused = true;
        document.getElementById("pauseButton").src = "Images/play.png";
    }
    else{
        paused = false;
        document.getElementById("pauseButton").src = "Images/pause.png";

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

        document.getElementById("black").style.backgroundColor = "red"
        document.getElementById("white").style.backgroundColor = "green"
    }
    if(Math.round(whiteTime*10)/10==0){
        paused = true;
        document.getElementById("pauseContainer").style.display = "none";
        document.getElementById("black").style.backgroundColor = "green"
        document.getElementById("white").style.backgroundColor = "red"
    }
}
function blackDone(){
    if(!paused){
        turn = "white";
        document.getElementById("confirmWhite").style.display = "inline";
        document.getElementById("confirmBlack").style.display = "none";
        blackTime = blackTime+increment;
    }
}
function whiteDone(){
    if(!paused){
        turn = "black";
        document.getElementById("confirmWhite").style.display = "none";
        document.getElementById("confirmBlack").style.display = "inline";
        whiteTime = whiteTime+increment;
    }
    
}