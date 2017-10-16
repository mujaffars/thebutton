var screenHeight = parseInt($(window).height());
var screenWidth = screenHeight * 56.25 / 100;
var btnchw = screenHeight * 10.25 / 100;

if (screenWidth < screenHeight) {
    var fontSize = parseInt(eval(eval(screenWidth * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenWidth * 4) / 100));
} else {
    var fontSize = parseInt(eval(eval(screenHeight * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenHeight * 4) / 100));
}