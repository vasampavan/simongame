
var level=0;
var userClickedPattern=[];
var started=false;
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
});   
function nextSequence(){
    userClickedPattern = [];
    level+=1;
    $("#level-title").text("Level "+level); 
    var randomNum=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNum];
gamePattern.push(randomChosenColor);
animatePress(randomChosenColor);
$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
},100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  
      } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  
}
function startOver(){
level=0;
gamePattern=[];
started=false;
}