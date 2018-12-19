$(document).ready(function() {
    //array that will be used a bank or storage for the animals we are giphying
    var gifBank = [];
    
        
        
      //running this function does the ajax call to search for and return animal gif results
         function displayAnimals() {
    
        var j = $(this).data("search");
        console.log(j);
    // defines the search parameters sent to the API link , and returns results with a limit of 10 per search/request
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + j + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        console.log(queryURL);
    //ajax method
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var animalDiv = $("<div class='col-md-6'>");
                     //declaring variable for rating
                var rating = results[i].rating;
                    //var for animated gifs result
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                    //var for static gifs result
                var staticSource = results[i].images.fixed_height_still.url;
                var animalImg = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                animalImg.attr("src", staticSource);
                animalImg.addClass("animalGiphy");
                animalImg.attr("data-state", "still");
                animalImg.attr("data-still", staticSource);
                animalImg.attr("data-animate", defaultAnimatedSrc);
                    //in the animalDiv...add to the gif that is returned a rating for the <img>
                animalDiv.append(p);
                    //append an image or gif to the animalDiv
                animalDiv.append(animalImg);
                $("#gifArea").prepend(animalDiv);
    
            }
        });
    }
    
      //jQuery onClick method with an eventListener accept input, process it and pushes to gifBank array
        $("#addAnimal").on("click", function(event) {
            event.preventDefault();
            var newAnimal = $("#animalInput").val().trim();
            //push new input to the gitBank, which is the array storing animals
            gifBank.push(newAnimal);
            console.log(gifBank);
            $("#animalInput").val('');
            //callback to displayButtons
            displayButtons();
          });
    
      //Function goes through gifBank array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < gifBank.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "animal");
          a.attr("data-search", gifBank[i]);
          a.text(gifBank[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();    
      //Click event on button with id of "show" executes displayAnimals function
      $(document).on("click", "#animal", displayAnimals);
    
      //Click event on gifs with class of "animalGiphy" executes pausePlayGifs function
      $(document).on("click", ".animalGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute then alters the img source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
           //if img state is still, then animate or play the gif
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            //else if state is animated then make the gif image still or pause it
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });
