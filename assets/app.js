// GLOBAL VARIABLES
//======================================================================
var cities = ["barcelona", "ibiza", "lisbon", "amsterdam", "prague", "istanbul", "budapest", "brussels", "cartagena", "aruba", "puerto rico"];

var apiKey = "&api_key=dc6zaTOxFJmzC"

var endpoint = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";

var url = "http://api.giphy.com/v1/gifs/search?q="

console.log(url + cities[4] + apiKey)

var addCity = $("#addCity")[0];
console.log(addCity)

var inputBox = $("#inputBox")[0];
console.log(inputBox)
//Arrays and Variables for holding data

var cityButtons = $("#cityButtons")[0];
console.log(cityButtons)

var cityGif = $("#cityGif")[0];
console.log(cityGif)
// pull the user input
// push the string to display on the html
// push the string to the giphy API to return 10 images




// FUNTIONS (Reusalbe blocks of code that I will call upon when needed)
//======================================================================
function pullUserInput(query) {
    query = query.replace(/ /g, "+")
    var endpoint = url + query + apiKey
    return endpoint;
}

console.log(pullUserInput("hey"))





// MAIN PROCESS
//======================================================================

$(inputBox).keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        var userInput = pullUserInput($('#inputBox').val())
        console.log("enter was pressed")
        console.log(this)
        // alert("inputBox.  " + inputBox.val(" ") +  " success");
        $('#inputBox').val();
        console.log(pullUserInput($('#inputBox').val()))

        $.ajax({
            url: userInput,
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res);
                console.log(res.data)
                for (i = 0; i < 10; i++) {
                  console.log (res.data[i].images.original.url)

                }
            }
        });

        // alert(inputBox.val()); // get value

    }
});

// get these folders connected to the github repo
// dynically create buttons that also show GIFS
// append GIFs to DOM
// check out guacs code

//Testing/Debugging
