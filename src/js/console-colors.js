/** 
Colors from the Ocean Next Theme
https://github.com/voronianski/oceanic-next-color-scheme#color-palette

Post about console log styles:
http://jscottsmith.me/notes/styling-your-console-logs 
**/

// Styles and Colors
var colors = {
	gray: 'font-weight: bold; color: #1B2B34;',
	red: 'font-weight: bold; color: #EC5f67;',
	orange: 'font-weight: bold; color: #F99157;',
	yellow: 'font-weight: bold; color: #FAC863;',
	green: 'font-weight: bold; color: #99C794;',
	teal: 'font-weight: bold; color: #5FB3B3;',
	blue: 'font-weight: bold; color: #6699CC;',
	purple: 'font-weight: bold; color: #C594C5;',
	brown: 'font-weight: bold; color: #AB7967;',
};

var bgc = {
	red: 'background-color: #EC5f67; font-weight: bold; color:rgb(24, 27, 29);',
	orange: 'background-color: #F99157; font-weight: bold; color:rgb(24, 27, 29);',
	yellow: 'background-color: #FAC863; font-weight: bold; color:rgb(24, 27, 29);',
	green: 'background-color:  #99C794; font-weight: bold; color:rgb(24, 27, 29);',
};

// console.log('%cHello', bgc.red);
// console.log('%cHello', bgc.orange);

// All the colors
// console.log('%cHello', colors.gray);
// console.log('%cHello', colors.red);
// console.log('%cHello', colors.orange);
// console.log('%cHello', colors.yellow);
// console.log('%cHello', colors.teal);
// console.log('%cHello', colors.blue);
// console.log('%cHello', colors.purple);
// console.log('%cHello', colors.brown);
// Log with multiple colors
// console.log(
// 	'%cGray %cRed %cOrange %cYellow %cGreen %cTeal %cBlue %cPurple %cBrown',
// 	colors.gray,
// 	colors.red,
// 	colors.orange,
// 	colors.yellow,
// 	colors.green,
// 	colors.teal,
// 	colors.blue,
// 	colors.purple,
// 	colors.brown
// );

// Log that's partially colored and the rest is default styling
//console.log('%cWarning: %cThe cake is a lie', colors.red, '');
