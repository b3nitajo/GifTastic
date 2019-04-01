//VARIABLES
var topics = ["pizza", "chicken", "fries"];
var userfavFoodArr = [];
createButton(topics);

// ADD LISTENER TO FAV FOOD CLICK EVENT TO TRIGGER AJAX
$(document).on("click", ".favFoods", function () {
    var favFood = $(this).attr("data-favFood");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jGgqEkH19SV9vhks3KcMO0PvjHILSOnS&q=" +
    favFood + "&limit=10&offset=0&rating=G&lang=en";

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
        //CREATE DIV FOR IMAGE
          var favFoodDiv = $("<div>");
          favFoodDiv.addClass("foodImages");
          var p = $("<p>").text("Rating: " + results[i].rating);
          favFoodDiv.append(p);
        //ANIMATION URL VARIABLES
          var still = results[i].images.fixed_height_still.url;
          var animate = results[i].images.fixed_height.url;
        //CREATE IMAGES
          var favFoodImage = $('<img>');
          favFoodImage.attr("src", animate);
          favFoodImage.attr('data-animate', animate);
          favFoodImage.attr('data-still', still);
          favFoodImage.attr('data-state', 'animate');
        //ADD IMAGE AND LISTENER TO DIV
          favFoodDiv.append(favFoodImage);
          $("#gifs-appear-here").prepend(favFoodDiv);
          favFoodImage.on('click', animateGif);
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
    var userFavFood = $('#userFavFood').val().trim();
    topics.push(userFavFood);
    var userButtons = createButton(topics);
    $("#foodButtons").append(userButtons);
    console.log(userfavFoodArr);
    $('#userFavFood').val('');
});

//CREATE BUTTONS ON PAGE
function createButton(arr){
    $("#foodButtons").empty();
    for (var i=0; i < arr.length; i++){
        var newButton = $('<button>');
        newButton.attr("data-favFood", arr[i]);
        console.log("data-favFood", arr[i]);
        newButton.addClass("favFoods");
        newButton.text(arr[i]);
        $("#foodButtons").append(newButton);
    }    
 };




