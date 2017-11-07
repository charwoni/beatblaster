var currentBeat = 0;
var descDown = true;
var nextBeatReady = false;

$(document).ready(function(){
    $("#arrowBar").click(function(){

        nextBeat();
        
    });
});

$(document).ready(function(){
    $("#start").click(function(){
        $("#start").hide();
        startGame(); 
    });
});

$(document).on("keyup", function(event){ 
        if(event.shiftKey && (event.which == 13)){
            nextBeat();
        };
    
});

$(document).ready(function(){
   
});

//$(document).ready(function(){
//    $("textarea").keypress(function(event) {
//        if (event.keyCode == 13 && event.shiftKey) {
//         nextBeat(); 
//         }
//});
//   
//});

//TO DO:
//
//set up objects that contain beat sheets
//set up functions that take objects and generate beatDivs with id="beatDiv_i"
//set all beat divs at top: 100%
//function on down arrow to move through the beat divs
//set up functions to get and store data from text areas
//set up timer function to rush through steps, maybe with moving time bar and background growing red as you near time limit or something
//maybe a rule where if you dont write enough words then you lose everything


//Function that creates the html elements for the various individual Beat Divs
function createBeatDivs(){
    
    for(i=0; i < beatsheet.length; i++){ //runs through all the beats
            
        textHtml = "<div class=\"beatDiv\" id=\"beatDiv_" + (i+1) +"\"> \
                        <p class=\"beatTitle\">" + (i+1) + ". " + beatsheet[i].Title + "</p> \
                        <div class=\"descArrow\" id=\"descArrow_" + (i+1) + "\"></div> \
                        <p class=\"beatDescription\"><span>" + beatsheet[i].Description + "</span></p> \
                        <hr> \
                        <textarea class=\"beatField\"> </textarea> \
                        </div>";

        $("#centeringDiv").append(textHtml);

        var beatDiv = "#beatDiv_" + (i+1);

        //sets the CSS for each div so they start located off screen
          $(beatDiv).css({"position": "fixed", "top": "100%", "margin": "auto", "opacity": "0"});  
    }; //end of for loop
    
    $("#beatDiv_1").animate({top: "12%", opacity: "1.0"}, 1000);
    
    $("#beatDiv_1").children("textarea").focus();   
    

    
    
};


function startGame(){
    
//  bring Arrow Bar up
    $("#arrowBar").animate({opacity: "0.2%"},400);
  
    $("#overlay").animate({opacity: "0.9"}, {duration: 1000, queue: false})
//    setTimeout(function(){
//        $("#topBar").css({filter: "blur(1.6px)"});
//    }, 800);
  //Create Beat Sheet Div HTML elements  
    createBeatDivs();
    
    currentBeat = 1;
    
    $(".descArrow").click(function(){
        var currentArrowID = "#descArrow_" + currentBeat;
        expandDescription();
    });
    
    $(".beatDescription").click(function(){
        var currentArrowID = "#descArrow_" + currentBeat;
        expandDescription();
    });

     $(".beatField").on("input",function(){
        var currentBeatID = "#beatDiv_" + currentBeat;
        if($(currentBeatID).children(".beatField").val().length > 15){
            nextBeatReady = true;
            $("#arrowBar").css({filter:"saturate(100%)",opacity:"1"});
        }
    });
    
}


function nextBeat(){
    
    if(!nextBeatReady){return;};
    
    var currentBeatID = "#beatDiv_" + currentBeat;
    var nextBeatID = "#beatDiv_" + (currentBeat + 1);
    
//    $(currentBeatID + " .beatField").css({"color": "#DDD"});
    $(currentBeatID + " .beatField").attr("disabled",true);
    
    beatsheet[currentBeat-1].userInput = $(currentBeatID + " .beatField").val();
    
    $(nextBeatID).animate({top: "12%", opacity: "1.0"}, 1300);
    
    $(currentBeatID).animate({top: "-76%", opacity: "0"}, 1300);
    
    $(nextBeatID).children("textarea").focus();   
    
    descDown = true;
    
    currentBeat++;
    
    if(currentBeat > beatsheet.length){
        endGame();
    };    
    
    nextBeatReady = false;
    
    $("#arrowBar").css({filter:"saturate(0%)",opacity:"0"});

}



function expandDescription(){
    
    var currentBeatID = "#beatDiv_" + currentBeat;
    
    if(descDown){
        $(currentBeatID).children(".beatDescription").slideUp(250);
        descDown = false;
        $(currentBeatID).children("textarea").animate({height:"79%"},300);
    }
    else {
        $(currentBeatID).children(".beatDescription").slideDown(250);
        descDown = true;
        
        setTimeout(function(){
            var descHeight = $(currentBeatID).children(".beatDescription").css("height");
            var textareaHeight = $(currentBeatID).children("textarea").css("height");
            var newHeight = "calc(79% - " + descHeight + ")";            $(currentBeatID).children("textarea").css("height",newHeight);
        },300);
         
    };
    
   
//    alert(descDown);
}; 



function endGame(){
    
    $("#arrowBar").animate({top:"100%"},300);
    
    $("#centeringDiv").append("<div id=\"endDiv\"></div>");
    
    for(i=0; i < beatsheet.length; i++){ //runs through all the beats
            
        var textHtml = "<p class=\"endTitle\">" + (i+1) + ". " + beatsheet[i].Title + "</p> \
                        <p class=\"userInput\">" + beatsheet[i].userInput + "</p>";

        $("#endDiv").append(textHtml);
    };
    
    setTimeout(function(){$("#endDiv").animate({opacity:"1"},300);},1300);
};
