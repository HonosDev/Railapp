/**
 * api.js - This files will contains all methods which are making requests to the transport API
 * @author B00290473
 */

/* API AUTH CONFIGURATION */
var api_key 	= "2d3480365762b20cb69f48abc2713c83";
var app_id 		= "1c833fe1";
var keyurl 		= "?api_key="+api_key+"&app_id="+app_id;
var domainurl 	= "http://transportapi.com/v3/uk/";

function getTrain(){
	var trainStatement = $.getJSON(domainurl+"train/station/PYG///timetable.json"+keyurl);
	console.log(trainStatement);
}