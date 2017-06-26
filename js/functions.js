
/****************************************************************************
 *
 * Drawing with Canvas Demo 
 * Developed by Jorge IvÃ¡n Meza MartÃ­nez - http://jorgeivanmeza.com/
 *
 * This demostration was developed to play with the HTML5 canvas facilities,
 * it uses Javascript callback functions to make the code a bit more modular.
 *
 * This demo can be accessed using a webkit based browser from the desktop or
 * a mobile device
 *
 * Change log
 * ----------
 *
 *     0.1    Initial release.
 *
/////////////////////////////////////////////////////////////////////////////

/**
 * Reference to the canvas area
 */

var canvas = null;

/**
 * Reference to the 2D context from the canvas
 */

var context = null;

/**
 * Default properties for the canvas
 */

var properties = null;

/**
 * Last touched point on the canvas: x value
 */

var lastX;

/**
 * Last touched point on the canvas: y value
 */

var lastY;

/**
 * Flag if the mouse buttons are pressed or not
 */

var isMousePressed = false;

/**
 * Start up procedure
 */

window.onload = function() {

	// Get the canvas reference

	canvas = document.getElementById("myCanvas");

	// Get the 2D context reference from the canvas

	context = canvas.getContext("2d");

	// Set the default properties for the canvas

	properties = {
		fill:   "#000000",
		stroke: "#000000",
		clear:  "#FFFFFF",
		size:   5,
		cap:    "round",
		join:   "round",
		/* width: screen.availWidth - 30, */
		width: window.innerWidth - 28,
		height: window.innerHeight - 160
	};

	// Set the canvas size (important step or drawing will fail)

	canvas.width        = properties.width;
	canvas.height       = properties.height;
	canvas.style.width  = properties.width + 'px';
	canvas.style.height = properties.height + 'px';

	// Set the web page's handler for the touch/move event 

	document.ontouchmove = function(event)
	{ 
		event.preventDefault(); 
	}

	// Set the Reset button behaviour

	document.getElementById("reset").onclick = clearAll;

	// Set the canvas' mouse click behaviour

	canvas.onmousedown = function(event) 
	{
		isMousePressed = true;

		handleMouse(event, function(lastX, lastY, curX, curY) 
		{
			point(curX, curY);
		});
	};

	// Set the canvas' mouse release click behaviour

	canvas.onmouseup = function(event) 
	{
		isMousePressed = false;
	};

	// Set the canvas' mouse drag behaviour

	canvas.onmousemove = function(event) 
	{
		if(!isMousePressed)
			return;

		handleMouse(event, function(lastX, lastY, curX, curY) 
		{
			line(lastX, lastY, curX, curY);
		});
	};

	// Set the canvas' touch/start behaviour

	canvas.ontouchstart = function(event) 
	{
		handleTouch(event, function(lastX, lastY, curX, curY) 
		{
			point(curX, curY);
		});
	};

	// Set the canvas' touch/move behaviour

	canvas.ontouchmove = function(event) 
	{
		handleTouch(event, function(lastX, lastY, curX, curY) 
		{
			line(lastX, lastY, curX, curY);
		});
	};

	// Change the pen color for the drawing

	

	// Hide the Android browser's URL bar

	if(!window.pageYOffset)
	{ 
		hideAddressBar(); 
	}

	window.addEventListener("orientationchange", hideAddressBar);

	// Clear the canvas for the first time

	clearAll();

};

/////////////////////////////////////////////////////////////////////////////

/**
 * Clear the canvas
 */

function clearAll()
{
	context.fillStyle = properties.clear;
	context.rect(0, 0, properties.width, properties.height);
	context.fill();
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Set the properties for drawing before execute the 'what' drawing procedure
 */

function doWithStyle(what)
{
	context.beginPath();
	context.strokeStyle = properties.stroke;
	context.fillStyle   = properties.fill;
	context.lineCap     = properties.cap;
	context.lineJoin    = properties.join;
	context.lineWidth   = properties.size;

	what();

	context.fill();
	context.stroke();
	context.closePath();
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Draw a point on the canvas
 */

function point(x, y)
{
	doWithStyle(
		function()
		{
			context.arc(x, y, 1, 0, Math.PI * 2, true);
		}
	);
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Draw a line on the canvas
 */

function line(x1, y1, x2, y2)
{
	doWithStyle(
		function()
		{
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
		}
	);
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Handle the mouse events over the canvas executing the corresponding action
 */

function handleMouse(event, action)
{
	event.preventDefault();

    var curX = event.pageX - canvas.offsetLeft;
    var curY = event.pageY - canvas.offsetTop;

	action(lastX, lastY, curX, curY);

	lastX = curX;
	lastY = curY;
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Handle the touch events over the canvas executing the corresponding action
 */

function handleTouch(event, action)
{
	event.preventDefault();

	var curX = event.touches[0].clientX - canvas.offsetLeft;
	var curY = event.touches[0].clientY - canvas.offsetTop;

	action(lastX, lastY, curX, curY);

	lastX = curX;
	lastY = curY;
}

/////////////////////////////////////////////////////////////////////////////

/**
 * Hide the URL address bar on standard Android's browser
 * Solution found on http://mobile.tutsplus.com/tutorials/mobile-web-apps/remove-address-bar/
 */

function hideAddressBar()
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout(function()
      {
      	window.scrollTo(0, 1);
      }, 50 );
  }
}

/////////////////////////////////////////////////////////////////////////////
