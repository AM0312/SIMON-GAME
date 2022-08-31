var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern=[];
    var n=Math.random()*4;
    n=Math.floor(n);
    var randomChosenColor=buttonColors[n];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("SUCCESS");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("WRONG");
        $("body").addClass("game-over");
        var audioWrong=new Audio("sounds/wrong.mp3");
        audioWrong.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("#level-title").text("WRONG ANSWER!!!!!Press a key")
}