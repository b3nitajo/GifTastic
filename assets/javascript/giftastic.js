// Adding click event listen listener to all buttons
$("button").on("click", function() {
    // Grabbing and storing the data-favFood property value from the button
    var favFood = $(this).attr("data-favFood");

    // Constructing a queryURL using the favFood name
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jGgqEkH19SV9vhks3KcMO0PvjHILSOnS&q=" +
    favFood + "&limit=10&offset=0&rating=G&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

    //ADD GIPHY TO IMAGE LIST AFTER BUTTON CLICK
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var favFoodDiv = $("<div>");
          favFoodDiv.attr("class", "foodImages");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var favFoodImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          favFoodImage.attr("src", results[i].images.fixed_height.url);
          // Appending the paragraph and image tag to the favFoodDiv
          //var favFoodCol = $(".col");
          favFoodDiv.append(p);
          favFoodDiv.append(favFoodImage);
          // Prependng the favFoodDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(favFoodDiv);
        }
    });
 });

 
 //build user search query
function buildQueryURL() {
    var queryParams = $("#userFavFood").val().trim();
    
    // Grab text the user typed into the search input, add to the queryParams object
    

    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jGgqEkH19SV9vhks3KcMO0PvjHILSOnS&q=" +
    queryParams + "&limit=10&offset=0&rating=G&lang=en";
  
    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}

$("#userSearch").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    creatButton();
  
    // Empty the region associated with the articles
   // clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(queryURL);
    });
});


function creatButton() {
    var queryParams = $("#userFavFood").val().trim();
    var newButton = $('<button>');
    newButton.attr("data-favFood", queryParams);
    newButton.text(queryParams);
    $("#foodButtons").append(newButton);
}