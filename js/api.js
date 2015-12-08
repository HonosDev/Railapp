/**
 * api.js - This files will contains all methods which are making requests to the transport API
 * @author B00290473
 */

/* API AUTH CONFIGURATION (B00290473)*/
var api_key 	= "2d3480365762b20cb69f48abc2713c83";
var app_id 		= "1c833fe1";
var keyurl 		= "?api_key="+api_key+"&app_id="+app_id;
var domainurl 	= "http://transportapi.com/v3/uk/";

/**
 * getTrain() - Method that getting train at a given station
 * @param Station departureStation 
 * @param String date String format 2014-11-20
 * @param String time String format 19:45
 * @param Station arrivalStation Must be an Arrival Object
 * @author B00290473
 */
function getTrain(departureStation, date, time, arrivalStation){
	var searchType = 1;
	/* Create the url api request depending on parameters */
	var url;
	if(!isApiDate(date)){
		date = toApiDate(date);
	}

	if(arrivalStation == null){
		/* FROM SEARCH : No arrival station has been mentionned */
		url = domainurl+"train/station/"+departureStation.getCode()+"/"+date+"/"+time+"/timetable.json"+keyurl;
	}else{
		searchType = 2;
		/* FROM/TO SEARCH : An arrival station has been mentionned */
		url = domainurl+"train/station/"+departureStation.getCode()+"/"+date+"/"+time+"/timetable.json"+keyurl+"&destination="+arrivalStation.getCode();
	}

	var departures = [];
	var trainStatement = $.getJSON(url, function(data){
		$.each( data['departures']['all'], function( key, val ) {
			if(val['platform'] == null){
				val['platform'] = "Unk";
			}
			if(val['aimed_arrival_time'] == null){
				val['aimed_arrival_time'] = "-"
			}
			var destination  = new Station(val['destination_name'], stationToCode(val['destination_name']));
			var origin 		 = new Station(val['origin_name'], stationToCode(val['origin_name']));
			var d = new Departure(departureStation, val['aimed_departure_time'], destination, val['platform'], val['aimed_arrival_time'], origin);
			departures.push(d);
		});
		displayResult(searchType, departures);
	});
}