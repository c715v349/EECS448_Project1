/**
 * @author      Paul Charles   
 * @author      Purna Doddapaneni
 * @author      Dilesh Fernando
 * @author      Brian Lee
 * @author      Paul Charles
 */
//global variables to keep tack of time.
var hours=0;
var minutes=0;
var seconds=0;


// Our variables
var clockBegin = true;//fixes issue with starting at 1 second after the specified time

//run the clock function every second.
var clockInterval = setInterval(clock, 1000);
var timerInterval = setInterval(timer, 1000);

var clockSelected = true; var stopwatchSelected = false; var timerSelected = false;

//clock running functions
/**
 * Changes the time of the clock as well as displaying that time    (1)
 * <p>
 * The clock is operated by incrementing the seconds. This is a marker
 * to increment the minutes when it reaches 60 seconds. The incrementation
 * of the minutes allow for the incrementation of hours when 60 minutes are
 * are reached. When each of the three time markers reach the incrementation
 * limit, they are reset to 0. However, the hours are reset to a value 
 * depending on the time mode selected. The display features depend on 
 * the time mode selected and displays accordingly. Also calls the calendar
 * display and calls functions on new days to update calendar function.
 *															(2)
 * <p>
 * @param  none
 *                                                       (3)
 */
function clock()
{
	if(clockBegin){}//clock begins, make sure it doesn't increment a second immediately	
	else
	{	
		increment_second();
	}
	
	if((seconds % 60) == 0 && !clockBegin)
	{
		increment_minute();
		reset_seconds();
	}
	else if(clockBegin)
	{
		clockBegin = false;
	}
	
	if(minutes == 60)
	{
		increment_hour();
		reset_minutes();
	}
	
	if(hours == 24)
	{
		reset_hours();
		increment_day();
	}

	if(clockSelected)
	{
		if(document.getElementById('display_12hr').checked)
		{
			display_12hr_time(hours, minutes, seconds);
		}
		else
		{
			display_24hr_time(hours, minutes, seconds);
		}
	}
	

	display_day();
}

/**
 * Increment seconds variable by 1 to keep track of time          (1)
 * <p>                                                 (3)
 * @pre call from clock function
 * @post seconds incremented by 1
 */
function increment_second()
{
	seconds++;
}
/**
 * Reset Seconds to zero                                          (1)
 * <p>
 * This function is called when the seconds reach 59 seconds. The next value is 60 which corresponds to zero (2)
 * <p>                                                 (3)
 * @pre call from clock function
 * @post seconds reset to zero
 */
function reset_seconds()
{
	seconds=0;
}

/**
 * Increment minutes variable by 1 to keep track of time            (1)
 * <p>
 * This function is called when the variables seconds reaches 60    (2)
 * <p>                                                   (3)
 * @pre call from clock function
 * @post minutes incremented by 1
 */
function increment_minute()
{
	minutes++;
}

/**
 * Reset minutes to zero        (1)
 * <p>
 * This function is called when the minutes reach 59 minutes. The next value is 60 which corresponds to zero   (2)
 * <p>  
 * @pre call from clock function
 * @post minutes reset to zero                                                  (3)
 */

function reset_minutes()
{
	minutes=0;
}

/**
 * Increment Hours by 1 when it reaches 24       (1)
 * <p>                                                     (3)
 * @pre call from clock function
 * @post hours incremented by 1
 */

function increment_hour()
{
	hours++;
}

/**
 * Reset Hours to Zero    (1)
 * <p>
 * This function is called when the hours reach 24. The next value is 0 which corresponds to zero   (2)
 * <p>           
 * @pre call from clock function
 * @post hours reset to zero                                       (3)
 */
function reset_hours()
{
	hours=0;
}
/**
 * Display the time in 12 hour mode    (1)
 * <p>
 * The function considers various scenarios based on the nature on the timing system to pick the correct display style.
 * Formatting is also considered as the clock displays two digits for hours, minutes and time  
 * The AM/PM value is evaluted based on what the hours global variable is reading at a specific time. The clock is in PM mode when hours are greater than 12 and AM mode when the hours are less than 12. (2)
 * <p>
 * @param  hours - Global variable keeping track of hours
 * @param  minutes - Global variable keeping track of minutes
 * @param  seconds - Global variable keeping track of seconds
 *                                                       (3)
 */
function display_12hr_time(hours, mintues, seconds)
{
	//variables for display '0' in front of hours, minutes, seconds
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	var display_hours = hours;
	
	if (hours == 0)
	{
		document.getElementById("am_pm").innerHTML= "AM";
		display_hours = 12;
	}
	
	if (hours < 12)
	{
		document.getElementById("am_pm").innerHTML= "AM";
	}
	
	if (hours == 12)
	{
		document.getElementById("am_pm").innerHTML= "PM";
	}
	
	if (hours > 12)
	{
		document.getElementById("am_pm").innerHTML= "PM";
		display_hours = hours % 12;
	}
	
	if(seconds < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(minutes < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(display_hours < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	document.getElementById("full-time").innerHTML= 
		hour_zero_display 	+ display_hours + ":" + 
		minute_zero_display + minutes + ":" + 
		second_zero_display + seconds;
}


/**
 * Display the time in 24 hour mode    (1)
 * <p>
 * The function considers various scenarios based on the nature on the timing system to pick the correct display style.
 * Formatting is also considered as the clock displays two digits for hours, minutes and time  
 * <p>
 * @param  hours - Global variable keeping track of hours
 * @param  minutes - Global variable keeping track of minutes
 * @param  seconds - Global variable keeping track of seconds
 *                                                       (3)
 */
function display_24hr_time(hours, mintues, seconds)
{
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	if(seconds < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(minutes < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(hours < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	document.getElementById("full-time").innerHTML= 
		hour_zero_display 	+ hours + ":" + 
		minute_zero_display + minutes + ":" + 
		second_zero_display + seconds;
	
	document.getElementById("am_pm").innerHTML= "";
}
/**
 * Waits for mouseclick event to see which radio button is selected for ClockMode  (1)
 * <p>
 * If the 12 hour mode is chosen, set 24 hour mode function to false
 * <p>
 * @pre call when radio buttin is pushed
 * @post changes display of clock to 12 hour mode
 */
document.getElementById('display_12hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = true;
	document.getElementById('display_24hr').checked = false;
});

/**
 * Waits for mouseclick event to see which radio button is selected for ClockMode  (1)
 * <p>
 * If the 12 hour mode is chosen, set 24 hour mode function to true
 * <p>
 * @pre call when radio buttin is pushed
 * @post changes display of clock to 24 hour mode
 */
document.getElementById('display_24hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = false;
	document.getElementById('display_24hr').checked = true;
});

/**
 * Obtains the hours value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_hour variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_hour updated to new user choice
 */
var select_hour = document.getElementById("select_hour");
for(var i=1; i<=12; i++) {
	if (i == 12){
		var o12 = new Option(i);
		o12.setAttribute("selected","selected");
		select_hour.add(o12);
	}
	else
	{
		select_hour.add(new Option(i));
	}
}
/**
 * Obtains the minutes value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_minute variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_minute updated to new user choice
 */
var select_minute = document.getElementById("select_minute");
for(var i=0; i<=59; i++) 
{
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_minute.add(o1);
		}
		else
		{
			i = "0" + i;
			select_minute.add(new Option(i));
		}
	}
	else
	{
		select_minute.add(new Option(i));
	}
}

/**
 * Obtains the seconds value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_second variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_second updated to new user choice
 */
var select_second = document.getElementById("select_second");
for(var i=0; i<=59; i++) {
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_second.add(o1);
		}
		else
		{
			i = "0" + i;
			select_second.add(new Option(i));
		}
	}
	else
	{
		select_second.add(new Option(i));
	}
}
/**
 * Allows user to set desired time
 * <p>
 * With the various fields with input, and the set time button event occuring, the time is set to the user desired time. The various feilds are cleared to their initial values.
 * <p>
 * @pre set time button pushed
 * @post clock display update to new time
 */
document.getElementById('set_time').addEventListener('click', function() {
	//hours need to modify
	var slected_hours = parseInt(document.getElementById("select_hour").value);
	
	//these are directly set
	minutes = parseInt(document.getElementById("select_minute").value);
	seconds = parseInt(document.getElementById("select_second").value);

	//hours needs more work to get it display properly 
	var am_pm   = document.getElementById("select_am_pm").value;
	
	if (am_pm == "am" && slected_hours == 12)
	{
		hours = 0;
	} else if (am_pm == "am")
	{
		hours = slected_hours;
	} else if (am_pm == "pm" && slected_hours == 12){
		hours = 12;
	} else if (am_pm == "pm")
	{
		hours = slected_hours + 12;
	}
	
	clockBegin = true;//clock begins again, make sure it doesn't increment a second immediately
	
	//clear drop downs and set to default
	var select_hour = document.getElementById("select_hour");
	var length = select_hour.options.length;
	for (i = 0; i < length; i++) {
		select_hour[i].selected = select_hour[i].defaultSelected;
	}
	
	var select_minute = document.getElementById("select_minute");
	for(var i=0; i < select_minute.options.length; i++) {
		select_minute[i].selected = select_minute[i].defaultSelected;
	}

	var select_second = document.getElementById("select_second");
	for(var i=0; i < select_second.options.length; i++) {
		select_second[i].selected = select_second[i].defaultSelected;
	}
	
	var select_am_pm = document.getElementById("select_am_pm");
	select_am_pm[0].selected = select_am_pm[0].defaultSelected;

	//Reset the time display's display property 
	document.getElementById("time").style.display = '';
});

/**
 * Increments day/month if applicable  (1)
 * <p>
 * This function is called when the hours reach 24. (2)
 * <p>           
 * @pre call from clock function
 * @post increments day or month when applicable               (3)
 */
function increment_day(){
	
	if (day == 31 && (month == 2 || month == 4 || month == 6 || month == 9 || month == 11))
	{}	//do nothing
	else if (month == 2 && day == 30)
	{}	//do nothing
	else if (month == 12 && day == 31)
	{
		month = 1;
		day = 1;
		updateDate = true;
	}
	else if (day == 30 && (month == 2 || month == 4 || month == 6 || month == 9 || month == 11))
	{
		month++;
		day = 1;
		updateDate = true;
	}
	else if (day == 31)
	{
		month++;
		day = 1;
		updateDate = true;
	}
	else
	{
		day++;
		updateDate = true;
	}

}

/**
 * Allows user to set desired day and month
 * <p>
 * @pre set date button pushed
 * @post day update to new day
 */
document.getElementById('set_date').addEventListener('click', function() {

	month = parseInt(document.getElementById("select_month").value);
	day = parseInt(document.getElementById("select_day").value);

});

/**
 * Obtains the month and current month
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_month variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_month updated to new user choice
 */
var selected_month = document.getElementById("select_month");
var currentDate = new Date();
var month = currentDate.getMonth()+1;
for(var i=1; i<=12; i++) {
	if (i == currentDate.getMonth()+1){
		var o12 = new Option(i);
		o12.setAttribute("selected","selected");
		select_month.add(o12);
	}
	else
	{
		select_month.add(new Option(i));
	}
}
/**
 * Obtains the day and current day
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_day variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_day updated to new user choice
 */
var selected_day = document.getElementById("select_day");
var day = currentDate.getDate();
for(var i=1; i<=31; i++) {

	if (i == currentDate.getDate()){
		var o31 = new Option(i);
		o31.setAttribute("selected","selected");
		select_day.add(o31);
	}
	else
	{
		select_day.add(new Option(i));
	}
}

/**
 * Display the weekday    
 * @param  day - Global variable keeping track of day
 * @param  month - Global variable keeping track of month
 *                                                       
 */
var updateDate = false;
function display_day()
{	
	//puts the dropdown menu at the updated date (once a new day rolls over)
	for (i = 0; i < selected_day.options.length; i++) {
		if (updateDate) {
			selected_day.selectedIndex = day-1;
		}	
	}
	for (i = 0; i < selected_month.options.length; i++) {
		if (updateDate) {
			selected_month.selectedIndex = month-1;
			updateDate = false;
		}	

	}

	//weekday update
	switch (month)
	{
		case 1: //January
		case 4: //April
		case 7: //July
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					if (month == 4 && day == 31)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Sunday";
					}
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;
			}
			break;
		case 2: //February
		case 8: //August
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					if (month == 2 && day == 30)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Tuesday";
					}
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					if (month == 2 && day == 31)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Wednesday";
					}
					break;
				break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Sunday";
					break;
				}
			break;
		case 3: //March
		case 11: //November
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					if (month == 11 && day == 31)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Thursday";
					}
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Sunday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
			}
			break;
		case 5: //May
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Sunday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;
			}
			break;		
		case 9: //September
		case 12: //December
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					if (month == 9 && day == 31)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Saturday";
					}
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Sunday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;
			}
			break;	
		case 6: //June
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					if (day == 31 && month == 6)
					{
						document.getElementById("full-weekday").innerHTML= "Invalid date, reset date";
					}
					else
					{
						document.getElementById("full-weekday").innerHTML= "Sunday";
					}
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;
			}
			break;
		case 10: //October
			switch (day)
			{
				case 1:
				case 8:
				case 15:
				case 22:
				case 29:
					document.getElementById("full-weekday").innerHTML= "Saturday";
					break;
				case 2:
				case 9:
				case 16:
				case 23:
				case 30:
					document.getElementById("full-weekday").innerHTML= "Sunday";
					break;
				case 3:
				case 10:
				case 17:
				case 24:
				case 31:
					document.getElementById("full-weekday").innerHTML= "Monday";
					break;
				case 4:
				case 11:
				case 18:
				case 25:
					document.getElementById("full-weekday").innerHTML= "Tuesday";
					break;
				case 5:
				case 12:
				case 19:
				case 26:
					document.getElementById("full-weekday").innerHTML= "Wednesday";
					break;
				case 6:
				case 13:
				case 20:
				case 27:
					document.getElementById("full-weekday").innerHTML= "Thursday";
					break;	
				case 7:
				case 14:
				case 21:
				case 28:
					document.getElementById("full-weekday").innerHTML= "Friday";
					break;
			}
			break;
	}
}


/* Start of the display functions (zoom in, zoom out, hide/show display)   */


/**
 * Increases font size of clock display based on an array of 5 different sizes, default being the third one
 * Changes parameter directly on CSS style page.
 * <param> font-size CSS attribute of 'full-time' object
 * @pre User pressed "zoom in" button at any point.
 * @post Increases font size of clock display. If at maximum, display alert message and does not change size. Calls clock_center() function
 */
function zoom_in()
{
	var sizeArray = ["25px", "50px", "75px", "100px", "125px"];
	var arrayIndex;
	var full_time   = document.getElementById("full-time");
	var currentSize = getComputedStyle(full_time).getPropertyValue("font-size");

	for(i = 0; i <= 5; i++)
	{
		if(currentSize == sizeArray[i])
		{
			arrayIndex = i;
			break;
		}
	}
	
	if(currentSize == "125px")
	{
		alert("Font size already at maximum.");
	}
	else
	{
		document.getElementById("full-time").style.fontSize = sizeArray[i+1];
	}

	clock_center()
}

/**
 * Decreases font size of clock display based on an array of 5 different sizes, default being the third one
 * Changes parameter directly on CSS style page.
 * <param> font-size CSS attribute of 'full-time' object
 * @pre User pressed "zoom out" button at any point.
 * @post Decreases font size of clock display. If at minimum, display alert message and does not change size. Calls clock_center() function
 */
function zoom_out()
{
	var sizeArray = ["25px", "50px", "75px", "100px", "125px"]; // all possible sizes 
	var arrayIndex; // dummy variable to keep track of selected size
	var full_time   = document.getElementById("full-time");
	var currentSize = getComputedStyle(full_time).getPropertyValue("font-size");

	for(i = 0; i <= 5; i++)
	{
		if(currentSize == sizeArray[i])
		{
			arrayIndex = i;
			break;
		}
	}
	
	if(currentSize == "25px")
	{
		alert("Font size already at minimum.");
	}
	else
	{
		document.getElementById("full-time").style.fontSize = sizeArray[i-1];
	}

	clock_center()
}

/**
 * Hides the clock display if currently shown, shows the clock display if currently hidden
 * Changes parameter directly on CSS style page, both for 'full-time" (actual clock) and 
 * 	'am_pm" (AM/PM display)
 * Changes innerHTML text of button accordingly
 * <param> visibility CSS attribute of 'full-time' and 'am_pm' objects
 * @pre User pressed "hide display/show display" button at any point.
 * @post Hides the clock display if currently shown, shows the clock display if currently hidden,    and changes text of button accordingly
 */
function hide_show()
{

	var visibilityOfClock   = document.getElementById("full-time");
	var currentVisibilityOfClock = getComputedStyle(visibilityOfClock).getPropertyValue("visibility");
	var visibilityOfAMPM   = document.getElementById("am_pm");
	var currentVisibilityOfAMPM = getComputedStyle(visibilityOfAMPM).getPropertyValue("visibility");

	if (currentVisibilityOfClock == "visible")
	{

		document.getElementById("full-time").style.visibility = "hidden";
		document.getElementById("am_pm").style.visibility = "hidden";
		document.getElementById("hideshow_button").innerHTML = "Show Display";
	}

	if ((currentVisibilityOfClock == "hidden") && (currentVisibilityOfAMPM == "hidden"))
	{
		document.getElementById("full-time").style.visibility = "visible";
		if(clockSelected)
			document.getElementById("am_pm").style.visibility = "visible";
		document.getElementById("hideshow_button").innerHTML = "Hide Display";
	}

}

/**
 * Updates margin and fontSize attributes of display according to selected size in order
 * to keep display in the center of screen
 * <param> margin and fontSize CSS attribute of 'full-time' and 'am_pm' objects
 * @pre User pressed zoom in or zoom out button at any point.
 * @post Updates margin attribute of 'full-time' element to center and updates fontSize of 
 * 	am_pm element to change font size of AM/PM display accordingly
 */
function clock_center()
{
	var full_time   = document.getElementById("full-time");
	var currentSize = getComputedStyle(full_time).getPropertyValue("font-size");
	if(currentSize == "25px")
	{
		document.getElementById("full-time").style.margin = "-10px 0 0 -100px"; 
		document.getElementById("am_pm").style.fontSize = "10px";
	}
	else if(currentSize == "50px")
	{
		document.getElementById("full-time").style.margin = "-10px 0 0 -150px"; 
		document.getElementById("am_pm").style.fontSize = "18px";
	}
	else if(currentSize == "75px")
	{
		document.getElementById("full-time").style.margin = "-10px 0 0 -200px";
		document.getElementById("am_pm").style.fontSize = "25px"; 
	}
	else if(currentSize == "100px")
	{
		document.getElementById("full-time").style.margin = "-10px 0 0 -260px"; 
		document.getElementById("am_pm").style.fontSize = "32px";
	}
	else if(currentSize == "125px")
	{
		document.getElementById("full-time").style.margin = "-10px 0 0 -320px"; 
		document.getElementById("am_pm").style.fontSize = "40px";
	}

}

function stopTimerDisplay()
{
	clearInterval(timerInterval);
}

//used by stopwatch, timer, and set_time (to start display again if it is stopped by stopwatch or timer)
function startTimerDisplay()
{
	clearInterval(timerInterval);//if clock interval has been set already, then need to clear it first as not to stack executions with each interval
	timerInterval = setInterval(timer, 1000);
}

var timerBegin = true;

var timer_hour = 0;
var timer_min = 0;
var timer_sec = 0;

var timerUsed = false;

var select_timer_hour = document.getElementById("select_timer_hour");
for(var i=0; i<=99; i++) {
	
		select_timer_hour.add(new Option(i));
	
}

var select_timer_minute = document.getElementById("select_timer_minute");
for(var i=0; i<=59; i++) 
{
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_timer_minute.add(o1);
		}
		else
		{
			i = "0" + i;
			select_timer_minute.add(new Option(i));
		}
	}
	else
	{
		select_timer_minute.add(new Option(i));
	}
}


var select_timer_second = document.getElementById("select_timer_second");
for(var i=0; i<=59; i++) {
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_timer_second.add(o1);
		}
		else
		{
			i = "0" + i;
			select_timer_second.add(new Option(i));
		}
	}
	else
	{
		select_timer_second.add(new Option(i));
	}
}

document.getElementById('set_timer').addEventListener('click', function() {
	//hours need to modify
	timer_hour = parseInt(document.getElementById("select_timer_hour").value);
	
	//these are directly set
	timer_min = parseInt(document.getElementById("select_timer_minute").value);
	timer_sec = parseInt(document.getElementById("select_timer_second").value);

	timerBegin = true;//clock begins again, make sure it doesn't increment a second immediately
	
	
	startTimerDisplay();
	document.getElementById('timer_start_stop_button').innerHTML = "Stop";
	
	//Reset the time display's display property 
	document.getElementById("time").style.display = '';
});


document.getElementById('timer_start_stop_button').addEventListener('click', function()
{
	if(document.getElementById('timer_start_stop_button').innerHTML == "Start")
	{
		document.getElementById('timer_start_stop_button').innerHTML = "Stop";	
		startTimerDisplay();
	}
	else
	{
		document.getElementById('timer_start_stop_button').innerHTML = "Start";

		stopTimerDisplay();
	}
});

document.getElementById('timer_reset_button').addEventListener('click', function()
{
	timerInit();
	if(document.getElementById('timer_start_stop_button').innerHTML == "Start")
	{
		startTimerDisplay();
	}
	document.getElementById('timer_start_stop_button').innerHTML = "Start";
	setTimeout(stopTimerDisplay, 1000);
});

function timerInit()
{
    	//hours need to modify
	timer_hour = parseInt(document.getElementById("select_timer_hour").value);
	
	//these are directly set
	timer_min = parseInt(document.getElementById("select_timer_minute").value);
	timer_sec = parseInt(document.getElementById("select_timer_second").value);

	timerBegin = true;//clock begins again, make sure it doesn't increment a second immediately

    //Reset the time display's display property 
    document.getElementById("time").style.display = '';
}


function timer()
{
	
	if(timerBegin){

	}
	else
	{
		dec_timer_sec();
	}

	if((timer_sec == -1) && !timerBegin)
	{
		reset_timer_sec();
	}
	else if(timerBegin)
	{
		timerBegin = false;
	}
	
	if(timer_min == -1)
	{
		reset_timer_min();
	}	
	display_24hr_timer(timer_hour, timer_min, timer_sec);
}

function dec_timer_sec()
{
	timer_sec--;
}
function reset_timer_sec()
{
	if(timer_min > 0)
	{
		dec_timer_min();
		timer_sec = 59;
	}
	else if(timer_hour > 0)
	{
		dec_timer_hour();
		timer_min = 59;
		timer_sec = 59;
	}
	else
	{
		timer_sec = 0;
		if(timerUsed)
			stopTimerDisplay();
	}
}
function dec_timer_min()
{
	timer_min--;
}
function reset_timer_min()
{
	if(timer_hour > 0)
	{
		dec_timer_hour();
		timer_min = 59;
		timer_sec = 59;
	}
}
function dec_timer_hour()
{
	timer_hour--;
}

function display_24hr_timer(hours, mintues, seconds)
{
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	if(timer_sec < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(timer_min < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(timer_hour < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	if(timerSelected)
	{
		document.getElementById("full-time").innerHTML= 
			hour_zero_display 	+ timer_hour + ":" + 
			minute_zero_display + timer_min + ":" + 
			second_zero_display + timer_sec;
	}
}

var stopwatchUsed = false;

var stopwatchBegin = true;

var stopwatchInterval = setInterval(stopwatch, 1000);
var stopwatch_hour = 0;
var stopwatch_min = 0;
var stopwatch_sec = 0;
function stopwatch()
{
	if(stopwatchBegin || !stopwatchUsed){}
	else
	{
		increment_stopwatch_sec()
	}

	if((stopwatch_sec % 60) == 0 && !stopwatchBegin)
	{
		increment_stopwatch_min();
		reset_stopwatch_sec();
	}
	else if(stopwatchBegin)
	{
		if(stopwatchUsed)
			stopwatchBegin = false;
	}

	if(stopwatch_min == 60)
	{
		increment_stopwatch_hour();
		reset_stopwatch_min()
	}
	if(stopwatch_hour == 99)
	{
		reset_stopwatch_hour();
	}
	display_24hr_stopwatch(stopwatch_hour, stopwatch_min, stopwatch_sec);
}

function increment_stopwatch_sec()
{
	stopwatch_sec++;
}

function reset_stopwatch_sec()
{
	stopwatch_sec = 0;
}

function increment_stopwatch_min()
{
	stopwatch_min++;
}

function reset_stopwatch_min()
{
	stopwatch_min = 0;
}

function increment_stopwatch_hour()
{
	stopwatch_hour++;
}

function reset_stopwatch_hour()
{
	stopwatch_hour = 0;
}

function display_24hr_stopwatch(hours, minutes, seconds)
{
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	if(stopwatch_sec < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(stopwatch_min < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(stopwatch_hour < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	if(stopwatchSelected)
	{
		document.getElementById("full-time").innerHTML= 
			hour_zero_display 	+ stopwatch_hour + ":" + 
			minute_zero_display + stopwatch_min + ":" + 
			second_zero_display + stopwatch_sec;
	}
}

/*	
*	~~STOPWATCH~~
*	Start/stop toggle for stopwatch.
*	Start will begin the stopwatch at 00:00:00 if stopwatch is not already toggled on.
*	Start will resume stopwatch at displayed time if stopwatch was recently stopped.
*	Stop will stop stopwatch if it is started and hold the displayed time.
*/
document.getElementById('stopwatch_start_stop_button').addEventListener('click', function() {

	
	if(document.getElementById('stopwatch_start_stop_button').innerHTML == "Start")//in stopped state
	{
		document.getElementById('stopwatch_start_stop_button').innerHTML = "Stop";
			
		startStopwatchDisplay();
	} 
	else//=="Stop", in started state
	{
		document.getElementById('stopwatch_start_stop_button').innerHTML = "Start";
		stopStopwatchDisplay();
	}	

	stopwatchUsed = true;
});

/*
*	~~STOPWATCH~~
*	Reset for stopwatch.
*	Reset will set stopwatch at 00:00:00. 
*	Reset will stop stopwatch. 
*	Reset will turn the Start/stop toggle to display start.
*/
document.getElementById('stopwatch_reset_button').addEventListener('click', function() {


		//Reset will set stopwatch at 00:00:00. 
		stopwatchSetInit();


		if(document.getElementById('stopwatch_start_stop_button').innerHTML == "Start")//in stopped state
		{
			startStopwatchDisplay();//must update the display to 00:00:00 before stopping display
		}
		else//=="Stop", in started state
		{
			document.getElementById('stopwatch_start_stop_button').innerHTML = "Start";
		}
         
		setTimeout(stopStopwatchDisplay, 1000);//must hit the next second (run clock() for 1000ms) in order to update the display to 00:00:00 before stopping display
		
});

//begin the stopwatch at 00:00:00
function stopwatchSetInit()
{
    stopwatch_hour = 0; stopwatch_min = 0; stopwatch_sec = 0;
    stopwatchBegin = true;

    //Reset the time display's display property
    document.getElementById("time").style.display = '';
}

//used by stopwatch and timer
function stopStopwatchDisplay()
{
	clearInterval(stopwatchInterval);
}

//used by stopwatch, timer, and set_time (to start display again if it is stopped by stopwatch or timer)
function startStopwatchDisplay()
{
	clearInterval(stopwatchInterval);//if clock interval has been set already, then need to clear it first as not to stack executions with each interval
	stopwatchInterval = setInterval(stopwatch, 1000);
}



document.getElementById('stopwatch_select_button').addEventListener('click', function() {


		clockSelected = false;
		stopwatchSelected = true;
		timerSelected = false;
		document.getElementById("am_pm").style.visibility = "hidden";
});

document.getElementById('clock_select_button').addEventListener('click', function() {


		clockSelected = true;
		stopwatchSelected = false;
		timerSelected = false;
		document.getElementById("am_pm").style.visibility = "visible";
});

document.getElementById('timer_select_button').addEventListener('click', function() {


display_24hr_timer(timer_hour, timer_min, timer_sec);

		timerUsed = true;
		clockSelected = false;
		stopwatchSelected = false;
		timerSelected = true;
		document.getElementById("am_pm").style.visibility = "hidden";
});
