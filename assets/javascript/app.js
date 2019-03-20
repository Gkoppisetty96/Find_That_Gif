$(document).ready(function () {

    var gifs = ["Iron Man", "Harry Potter", "Steven Universe", "X-Men"];

    var gif = $("#gif-input").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";


    function displayGifInfo() {
        gif = $(this).attr("data-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10"

        console.log(gif);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImg = $("<img>");

                gifImg.addClass("thisGif")
                gifImg.attr("src", results[i].images.fixed_height_still.url);
                gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);
                gifImg.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.append(gifImg);

                $("#gif-view").prepend(gifDiv);
            }

        });

    }


    function makeButtons() {
        $("#for-buttons").empty();

        for (var i = 0; i < gifs.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-outline-dark gif");
            a.attr({ "data-name": gifs[i], "type": "button" });
            a.text(gifs[i]);
            $("#for-buttons").append(a);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        $("#gif-form").trigger("reset");
        makeButtons();
    })


    $(document).on('click', ".thisGif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

        console.log("state changed from " + state);

    });



    $(document).on("click", ".gif", displayGifInfo);

    makeButtons();

});
