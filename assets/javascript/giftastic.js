//VARIABLES
var topics = ["Trending", "Beyonce", "Cats"];
var userTopicArr = [];
createButton(topics);

// ADD LISTENER TO FAV FOOD CLICK EVENT TO TRIGGER AJAX
$(document).on("click", ".userTopics", function () {
    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jGgqEkH19SV9vhks3KcMO0PvjHILSOnS&q=" +
    topic + "&limit=9&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        var results = response.data;

    //ADD GIPHY TO IMAGE LIST AFTER BUTTON CLICK
        for (var i = 0; i < results.length; i++) {
        //CREATE COLUMN AND ROW FOR GIF IMAGE
    
        //CREATE DIV FOR IMAGE
          var column = $("<div>");
          column.addClass("col");
          var card = $("<div>");
          card.addClass("card");
          column.append(card);
          var cardBody = $("<div>");
          cardBody.addClass("card-body");
          card.append(cardBody);
          var topicDiv = $("<div>");
          topicDiv.addClass("topicImages");
          cardBody.append(topicDiv);
         
          var p = $("<p>").text("Title: " + results[i].title);
          topicDiv.append(p);
        
        //ANIMATION URL VARIABLES
          var still = results[i].images.fixed_height_still.url;
          var animate = results[i].images.fixed_height.url;
        //CREATE IMAGES
          var topicImage = $('<img>');
          topicImage.addClass("card-img-top").attr("src", animate);
          topicImage.attr('data-animate', animate);
          topicImage.attr('data-still', still);
          topicImage.attr('data-state', 'animate');
        //ADD IMAGE AND LISTENER TO DIV
          topicDiv.append(topicImage);
          $("#gifs-appear-here").prepend(column);
          topicImage.on('click', animateGif);
        }
    });

    //GIF ANIMATION
    function animateGif () {
        var foodGifState = $(this).attr('data-state');    
        if (foodGifState === 'still') {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } 
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    }
});


 //CREATE BUTTONS WHEN USER ENTERS A NEW FAV FOOD
$("#userSearch").on("click", function(event) {
    event.preventDefault();
    var userTopic = $('#userTopic').val().trim();
    topics.push(userTopic);
    var userButtons = createButton(topics);
    $("#topicButtons").append(userButtons);
    console.log(userTopicArr);
    $('#userTopic').val('');
});

//CREATE BUTTONS ON PAGE
function createButton(arr){
    $("#topicButtons").empty();
    for (var i=0; i < arr.length; i++){
        var newButton = $('<button>');
        newButton.attr("data-topic", arr[i]);
        console.log("data-topic", arr[i]);
        newButton.addClass("userTopics");
        newButton.text(arr[i]);
        $("#topicButtons").append(newButton);
    }    
 };




