$(document).ready(function() {
    //array that will be used a bank or storage for the animals we are giphying
    var gifBank = [];

    //running this function grabs and displays the animal gifs 
    function displayAnimals() {

        var j = $(this).data("search");
        console.log(j);
        // we have a  parameter for API link set to search term, a limit of 10 results is set
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
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSource = results[i].images.fixed_height_still.url;
                var animalImg = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                animalImg.attr("src", staticSource);
                animalImg.addClass("animalGiphy");
                animalImg.attr("data-state", "still");
                animalImg.attr("data-still", staticSource);
                animalImg.attr("data-animate", defaultAnimatedSrc);
                animalDiv.append(p);
                animalDiv.append(animalImg);
                $("#gifArea").prepend(animalDiv);

            }
        });
    }

    //jQuery onClick method that invokes a function to accept input, process it and displays the appended buttons after being pushed to gifBank array
    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animalInput").val().trim();
        gifBank.push(newAnimal);
        console.log(gifBank);
        $("#animalInput").val('');
        displayButtons();
    });

    //Function iterates through gifBank array to display button with array values in "myButtons" section of HTML
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
