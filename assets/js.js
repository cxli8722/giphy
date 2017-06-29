//generating button 
$( "input" ).on("click", function () {
  var value = $( this ).val().trim();;
  console.log(value)
  var newbtn =$("<button >").attr("data-animal", value).text(value);
  //now append this to some div called var
  $("#newbuttons").append(newbtn);
  console.log(value)
});
 
//function to display image when click on the button 
$("button").on("click", function() {
  var animal = $(this).attr("data-animal");
  //empty before new button is click 
  $("#gifs-appear-here").empty();
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=74f3cfb2a2f8405cb5b617277ce5f494&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var results=response.data;
    console.log(results)
    for (var i=0; i<results.length; i++){
      //variable for still image 
      var animalstill=$("<div>");
      var p =$("<p>").text("rating: " + results[i].rating);
      var animalstill = $("<img>");
      animalstill.attr("data-state", "still");
      animalstill.attr("data-still", results[i].images.fixed_height_still.url);
      animalstill.attr("data-animate", results[i].images.fixed_height.url);
      animalstill.attr("src", results[i].images.fixed_height_still.url);
      animalstill.append(p);
      animalstill.append(animalstill);
      $("#gifs-appear-here").prepend(animalstill);
    };
     
    $("#gifs-appear-here").on("click", "img", function() {
      console.log("hello")
      if($(this).attr("data-state")=== "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
      } else { 
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
      }
    });
  });
});


