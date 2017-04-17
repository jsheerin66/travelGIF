// check to see that file is linked to html file
console.log("hey girl hey")
// GLOBAL VARIABLES
//======================================================================
// variable representing the div with the id submit which the user clicks

// var newdiv = document.createElement("BUTTON");
// newdiv.innerHTML = "I am a Button";
// newdiv.setAttribute("class", "someClass" );
// // newdiv.appendChild(document.createTextNode("some text"));
// document.body.appendChild(newdiv);

//why is the array being used for the first four variables?
var submit = $("#submit")[0];
console.log(submit)
// this is the div that the user inputs tex
var search = $("#search")[0];
console.log(search)

// variable representing the div which the randomItems are displayed
var buttons = $("#buttons")[0];
console.log(buttons)
// variable reprsenting the gifs pulled from the api
var results = $("#results")[0];
console.log(results)
// replaced by new value to be listed on the listOfRandomItems array
// var randomItem = '';
// varialbe that is an array of random items
var listOfRandomItems = ["barcelona", "ibiza", "lisbon", "amsterdam", "prague", "istanbul", "budapest", "brussels", "cartagena", "aruba", "san juan"];
//custom api key to be added into the complete API url
var apiKey = "&api_key=dc6zaTOxFJmzC"
//compete api url
// var endpoint = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
// starting of the api url
var url = "http://api.giphy.com/v1/gifs/search?q="
//why are we console.log ing this?
console.log(url + listOfRandomItems[4] + apiKey)


// FUNTIONS (Reusalbe blocks of code that I will call upon when needed)
//======================================================================

// // pulled from giphy example, this will append the buttons to the html
// function renderButtons() {
//
//     buttons.empty();
//
//     for (var i = 0; i < listOfRandomItems.length; i++) {
//
//         var a = $('<button>')
//         a.addClass('gif'); // Added a class
//         a.text(listOfRandomItems[i]); // Provided the initial button text
//         buttons.append(a); // Added the button to the HTML
//
//         console.log(listOfRandomItems[i]);
//     }
// }

// Create a function that accepts a string
function pullUserInput(query) {
    // Replace spaces in string with + signs
    query = query.replace(/ /g, "+")
    // Concatenate url + query + apiKey to create a useable url
    var endpoint = url + query + apiKey
    // Return useable url to function
    return endpoint;
}

console.log(pullUserInput("hey"))

// function dynamicallyCreateButtons(array) {
//   var item;
//   for (item in array) {
//     console.log(array[item])
//     var button = document.createElement("BUTTON");
//     button.innerHTML = array[item];
//     button.setAttribute("class", "city" );
//    buttons.setAttribute("data-city", array[item])
//     // newdiv.appendChild(document.createTextNode("some text"));
//     buttons.appendChild(button);
//   }
//
// }
// dynamicallyCreateButtons(listOfRandomItems);
// created a function called dynamicallyCreateButtons set the parameter to array
function dynamicallyCreateButtons(array) {
    var i;
    for (i in array) {
        console.log(array[i])
        var button = document.createElement("BUTTON");
        button.innerHTML = array[i];
        button.setAttribute("class", "city");
        button.setAttribute("data-city", array[i]);
        buttons.appendChild(button);

    }
}
// calling the function dynamicallyCreateButtons to run and add to array listOfRandomItems
dynamicallyCreateButtons(listOfRandomItems)


// MAIN PROCESS
//======================================================================

$(search).keypress(function(e) {
    var key = e.which;
    if (key == 13) {
        // grabbing the userinput using jquery
        var userInput = search.value;
        console.log(userInput)
        listOfRandomItems.push(userInput);
        search.value = "";
        console.log(listOfRandomItems);
        // calling the id buttons and emptying its contents then transfering- need to go over a little more
        $(buttons).empty();
        dynamicallyCreateButtons(listOfRandomItems);
    }
});

// why doesnt this go to console.log anymore- what is this doing again? whats this purpose? did it not work bc line 131
$(buttons).on("click", ".city", function() {
    // Check to see if function is working
    console.log("clickity click");
    // Console logged what triggered the click
    console.log(this)
    // Console logged the data-city value of what triggered the click
    console.log(this.getAttribute("data-city"))
    // Assigned the value to a variable
    var randomItem = this.getAttribute("data-city");
    // Ran function pullUserInput to convert the value of randomItem
    // Into a useable url for the ajax call
    randomItem = pullUserInput(randomItem);
    // Check to see we have a good url string
    console.log(randomItem);

    // Start of ajax call
    $.ajax({
        // Use the url created above to make ajax call
        url: randomItem,
        // Get results
        type: 'GET',
        // Turn results into a json object
        dataType: 'json',
        // If call is successful output the results
        success: function(results) {
            // Console logged results
            console.log(results.data)
            for (i = 0; i < 10; i++) {
              console.log(results.data[i].embed_url)
              var img = document.createElement('');

                      results.appendChild(img);
            }

        }
    })

});

// CREATE AN IMG ELEMENT
// GIVE A SET ATTRIBUTE FOR THE SRC USING THE RESULTS.DATA[i].embed_url
// APPEND IMAGES TO RESULTS


// $(search).keypress(function(e) {
//     var key = e.which;
//     if (key == 13) // the enter key code
//     {
//         var userInput = pullUserInput($('#search').val())
//         console.log("enter was pressed")
//         console.log(this)
//         // alert("search.  " + search.val(" ") +  " success");
//         $('#search').val();
//         console.log(pullUserInput($('#search').val()))
// //calling the api using ajax to pull gifs, specifially 10 line 92
//         $.ajax({
//             url: userInput,
//             type: 'GET',
//             dataType: 'json',
//             success: function(results) {
//                 console.log(results);
//                 console.log(results.data)
//                 for (i = 0; i < 10; i++) {
//                     console.log(results.data[i].images.original.url)
// // copy and pasted from line 94 to 120- how would i have googled this?
// // it looks like this begins the appending of the results
//                     var div = $("<div>");
//
//                     div.attr("class", "imageHolder");
//
//                     div.attr("id", results.data[i].id);
//
//                     var picture = $("<img>");
//
//                     var gif = $("<img>");
//
//                     picture.attr("class", "img-responsive");
//
//                     gif.attr("class", "img-responsive");
//
//                     picture.attr("src", results.data[i].images.original_still.url);
//
//                     gif.attr("src", results.data[i].images.original.url);
//
//                     gif.css("display", "none");
//
//                     div.append(picture);
//
//                     div.append(gif);
//
//                     results.append(div);
//
//
//                 }
//             }
//         });
//
//   // got this code from online- differs from giffy code is this the vanilla js way
//         // var results = document.createElement("DIV");
//         // newdiv.appendChild(document.createTextNode("some text"));
//         // document.body.appendChild(newdiv);
//
//         // alert(search.val()); // get value
//
//     }
// });









// pull the user input
// push the string to display on the html
// push the string to the giphy API to return 10 images

// get these folders connected to the github repo
// dynically create buttons that also show GIFS
// append GIFs to DOM
// check out guacs code

//Testing/Debugging
