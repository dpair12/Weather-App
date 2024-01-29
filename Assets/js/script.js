//Variables Declared in Global Scope


//Variable for Main Section
var view = document.querySelector('main');
//Styling to have main section take up 100% of viewport width and height at all times (eliminates unnecessary white space)
view.style = 'width: 100vw; height: 100vh';
//Variable for Form
var form = document.querySelector('form');
//Variable that Grabs ID for Search Input
var input = document.getElementById('search-input'); 

//Event Listener for When Submit Button is Clicked on Form
form.addEventListener('submit', function(event) {
//Prevent Refresh
event.preventDefault();
//Sets value of search input as the user input variable
var userInput = input.value;
//Conditional Statement that runs results function is userInput is present, otherwise display alert message designating that a value must be entered
if (userInput) {
 results(userInput);
} else {
window.alert ('Please enter a city or county.');
}
});
//Function that opens up search.html with the results of the value inserted into search input
function results (userInput) {
window.location.href = "./search.html?search=" + userInput;
}
