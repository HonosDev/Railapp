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
			var d = new Departure(departureStation, val['aimed_departure_time'], destination, val['platform'], val['aimed_arrival_time'], origin, val['train_uid']);
			departures.push(d);
		});
		displayResult(searchType, departures);
	});
}

/**
 * getTrainInfos() - Method getting informations
 * @param String ID of the train
 * @author B00290473
 */
function getTrainInfos(train_uid){
	var url = domainurl+"train/service/train_uid:"+train_uid+"///timetable.json"+keyurl;

	var infos = $.getJSON(url, function(data){
		$.each(data['stops'], function(key, val){
			if(val['aimed_arrival_time'] == null){
				val['aimed_arrival_time'] = "-";
			}
			if(val['platform'] == null){
				val['platform'] = "Unk";
			}
			$("#t-"+train_uid).append("<div class='ui-block-a' style='width:60%;min-height:30px;'>"+val['station_name']+"</div>");
			$("#t-"+train_uid).append("<div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'>"+val['aimed_arrival_time']+"</div>");
			$("#t-"+train_uid).append("<div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'>"+val['platform']+"</div>");
		});
		$("#t-"+train_uid).append("<a class='ui-btn ui-btn-c ui-shadow' style='background: #3A4895;text-shadow: none;color: white;text-transform: uppercase; cursor:pointer;'>Get alarmed</a>");
	});
}

/**
 * locateStation() - This function will find all stations around the user localisation
 * @param int lon This is the longitude
 * @param int lat This is the latitude
 * @param int count This define how many station results will be displayed
 * @author B00290473
 */
function getStationByGeo(lat, lon, count){
	//http://transportapi.com/v3/uk/train/stations/near.json?
	$("#listOfStations").html("");
	var url = domainurl+"train/stations/near.json"+keyurl+"&lat="+lat+"&lon="+lon+"&rpp="+count;
	console.log(url);
	var stations = $.getJSON(url, function(data){
		$.each(data['stations'], function(key, val){
			$("#listOfStations").append("<li><a data-rel='back' data-transition='flow' onclick=\"setDepartureStation('"+val['name']+"')\"><strong>"+val['name']+"</strong> : "+val['distance']+"m </a></li>")
		});
		$("#listOfStations").listview("refresh");
	});

}