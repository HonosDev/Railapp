/**
 * model.js - File used like the model of this app/
 * Contains Objects definitions & all methods that call the API
 * @author B00290473
 */

/**
 * Departure - Object Definition
 * @author B00290473, B00294525
 * @param station d_station This is the departure station code 
 * @param date d_time This is the departure date 
 * @param station d_arrival This is the arrival station code
 * @param d_platform This is the platform the train is leaving from
 */
var Departure = function(d_station, d_time, d_arrival, d_platform){
	this.d_station = d_station;
	this.d_time = d_time;
	this.d_arrival = d_arrival;
	this.d_platform = d_platform; 
}

/**
 * Arrival - Object Definition
 * @author B00290473, B00294525
 * @param station a_station This is the arrival station
 * @param date a_time Tis is the arrival date
 * @param station a_departure This is the departure station#
 * @param a_platform This is the platform the train is arriving on
 */
var Arrival = function(a_station, a_time, a_departure, a_platform){
	this.a_station = a_station;
	this.a_time = a_time;
	this.a_departure = a_departure;
	this.a_platform = a_platform; 
}

/**
 * Station - Object Definition 
 * @author B00290473
 * @param string s_name This is the full name of the station
 * @param string s_code This is the code of the station
 */
var Station = function(s_name, s_code){
	this.s_name = s_name;
	this.s_code = s_code;
}

/**
 * Favorit - Object Definition
 * @author B00290473
 * @param int type This is the type of the favorit (describ the type os search made for this)
 * @param string f_departure This is the departure station store as a favorit
 * @param string f_arrival This is the arrival station store as a favorit
 * @param date f_time This is the last time the favorit has been used
 */
var Favorit = function(f_type, f_departure, f_arrival, f_time){
	this.f_type = f_type;
	this.f_departure = f_departure;
	this.f_arrival = f_arrival;
	this.f_time = f_time;
}

/* 
 * -------------------------------
 * OBJECT PROTOTYPE IMPLEMENTATION
 * -------------------------------
 */

/**
 * Departure OBJECT
 * getStationCode() - This method will return the departure station code
 * @author B00290473
 * @return String
 */
Departure.prototype.getStationCode = function() {
	return this.d_station;
};

/**
 * Departure OBJECT
 * getTime() - This method return the departure time as a date object
 * @author B00290473
 * @return date
 */
Departure.prototype.getTime = function() {
	return this.d_time;
};

/**
 * Departure OBJECT
 * getArrival() - This method return the arrival station code
 * @author B00290473
 * @return String
 */
Departure.prototype.getArrival = function() {
	return this.d_arrival;
};

/**
 * Departure OBJECT
 * getPlatform() - This method return the departure platfrom
 * @author B00294525
 * @return String
 */
Departure.prototype.getPlatform = function() {
	return this.d_platform;
};

/**
 * Departure OBJECT
 * toString() - This method return a Depature toString in the javascript console
 * @author B00290473
 * @return String
 */
Departure.prototype.toString = function() {
	return console.log("{OBJECT} DEPARTURE ['d_station' => "+this.d_station+", 'd_time' => "+this.d_time+", 'd_arrival' => "+this.d_arrival+"]");
};


/**
 * Arrival OBJECT
 * getStationCode() - This method will return the arrival station code
 * @author B00290473
 * @return String
 */
Arrival.prototype.getStationCode = function() {
	return this.a_station;
};

/**
 * Arrival OBJECT
 * getTime() - This method return the arrival time as a date object
 * @author B00290473
 * @return date
 */
Arrival.prototype.getTime = function() {
	return this.a_time;
};

/**
 * Arrival OBJECT
 * getDeparture() - This method return the departure station code
 * @author B00290473
 * @return String
 */
Arrival.prototype.getDeparture = function() {
	return this.a_departure;
};

/**
 * Arrival OBJECT
 * getPlatform() - This method return the arrival platfrom
 * @author B00294525
 * @return String
 */
Arrival.prototype.getPlatform = function() {
	return this.a_platform;
};

/**
 * Arrival OBJECT
 * toString() - This method return a Arrival toString in the javascript console
 * @author B00290473
 * @return String
 */
Arrival.prototype.toString = function() {
	return console.log("{OBJECT} Arrival ['a_station' => "+this.a_station+", 'a_time' => "+this.a_time+", 'a_departure' => "+this.a_departure+"]");
};


/**
 * Station OBJECT
 * getName() - This method will return the full name of the station
 * @author B00290473
 * @return String
 */
Station.prototype.getName = function() {
	return this.s_name;
};

/**
 * Station OBJECT
 * getCode() - This method will return the station code
 * @author B00290473
 * @return String
 */
Station.prototype.getCode = function() {
	return this.s_code;
};

/**
 * Station OBJECT
 * toString() - This method will return a Station toString in the javascript console
 * @author B00290473
 * @return String
 */
Station.prototype.toString = function() {
	return console.log("{OBJECT} Station ['s_name' => "+this.s_name+", 's_code' => "+this.s_code+"]");
};


/**
 * Favorit OBJECT
 * getType() - This method return the type of the search (which is the king of search made by the user)
 * @author B00290473
 * @return String
 */
Favorit.prototype.getType = function() {
	return this.f_type;
};

/**
 * Favorit OBJECT
 * getDeparture() - This method return the departure station stored in the favorit
 * @author B00290473
 * @return String
 */
Favorit.prototype.getDeparture = function() {
	return this.f_departure;
};

/**
 * Favorit OBJECT
 * getArrival() - This method return the arrival station stored in the favorit
 * @author B00290473
 * @return String
 */
Favorit.prototype.getArrival = function() {
	return this.f_arrival;
};

/**
 * Favorit OBJECT
 * getDate() - This method return the date stored in the favorit as a string
 * @author B00290473
 * @return String
 */
Favorit.prototype.getDate = function() {
	return this.f_time;
};


/**
 * Favorit OBJECT
 * toString() - This method return a Favorit toString in the javascript console 
 * @author B00290473
 * @return String
 */
Favorit.prototype.toString = function() {
	return console.log("{OBJECT} Favorit ['f_type' => "+this.f_type+", 'f_departure' => "+this.f_departure+", 'f_arrival' => "+this.f_arrival+", 'f_time' => "+this.f_time+"]");
};


/* 
 * ---------------------
 * GENERAL MODEL METHODS
 * ---------------------
 */

/*
 * Search methods
 */ 

/**
 * performSearch() - Launch a research identificated by a type.
 * This function will call the transport API library (api.js) to get results linked to the search.
 * @author B00290473
 */
function performSearch(typeOfSearch, form){
	switch (typeOfSearch){
		case 1:

		break;

		case 2:

		break;

		default:
			console.log("Unknown type of search");
		break;
	}
}

/**
 * switchSearchForm() - Method switching one type of search to an other by editing the form  
 * @author B00290473
 */
function switchSearchForm(searchType, form){
	switch(searchType){
		case 1:
			
		break;

		case 2:
		break;
	}
}

/**
 * setTitle() - Search method that will change the html content of the <h3> with the id 'search-title'
 * We create the title using search informations and then just changing the html using jQuery
 * @author B00290473
 */
 function searchSetTitle(searchType, searchDeparture, searchArrival){
 	switch (searchType){
 		case 1:
 			$("#search-title").html("Departures from <strong>"+searchDeparture+"</strong>");
 		break;

 		case 2:
 			$("#search-title").html("<strong>"+searchDeparture+"</strong> to <strong>"+searchArrival+"</strong>");
 		break;
 	}
 }