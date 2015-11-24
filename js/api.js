/**
 * api.js - This files will contains all methods which are making requests to the transport API
 * @author B00290473
 */

/* API AUTH CONFIGURATION */
var api_key 	= "2d3480365762b20cb69f48abc2713c83";
var app_id 		= "1c833fe1";
var keyurl 		= "?api_key="+api_key+"&app_id="+app_id;
var domainurl 	= "http://transportapi.com/v3/uk/";

/**
 * getTrain() - Method that getting train at a given station
 * @param Departure departureStation Must be a Departure Object
 * @param String date String format 2014-11-20
 * @param String time String format 19:45
 * @param Arrival arrivalStation Must be an Arrival Object
 */
function getTrain(departureStation, date, time, arrivalStation){

	/* Create the url api request depending on parameters */
	var url;
	if(arrivalStation == null){
		/* FROM SEARCH : No arrival station has been mentionned */
		url = domainurl+"train/station/"+departureStation.getCode()+"/"+date+"/"+time+"/timetable.json"+keyurl;
	}else{
		/* FROM/TO SEARCH : An arrival station has been mentionned */
		url = domainurl+"train/station/"+departureStation.getCode()+"/"+date+"/"+time+"/timetable.json"+keyurl+arrivalStation.getCode();
	}
	console.log(url);
	var departures = [];
	var trainStatement = $.getJSON(url, function(data){
		console.log(data['departures']['all']);
		$.each( data['departures']['all'], function( key, val ) {
			var d = new Departure(departureStation, val['aimed_departure_time'], val['destination_name'], val['platform']);
			departures.push(d);
		});
		console.log(departures);
	});
}