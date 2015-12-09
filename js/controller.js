/**
 * controller.js - This files will contains all methods which link model and transport API
 * @author B00290473
 */


/**
 * Search methods
 *
 *
 *
 * performSearch() - Launch a research identificated by a type.
 * This function will call the transport API library (api.js) to get results linked to the search.
 * Also it will save the data from the search as a recent in the localStorage.
 * @author B00290473, B00294525
 */
function performSearch(typeOfSearch){
    createLoader(); //function call via console works fine, but does not get triggered/resets when new page loads
    
    var s_depart    = new Station($("#station-departure").val(), stationToCode($("#station-departure").val()));
    var s_arrival   = new Station($("#station-arrival").val(), stationToCode($("#station-arrival").val()));
    var s_date      = $("#travel-date").val();
    var s_time      = $("#travel-time").val();
    
    //create favorite for recents
    var recent = new Favorite(typeOfSearch,s_depart,s_arrival, s_date);
    var recents = JSON.parse(localStorage["recents"]);
    //TODO limit recents to 5 entries and move up
    recents.push(recent);
    localStorage["recents"] = JSON.stringify(recents);
    
    switch (typeOfSearch){
        case "1":
            searchSetTitle(1, s_depart.getName());
            searchSetHeader(1);
            getTrain(s_depart, s_date, s_time);
            console.log('Search 1');
            break;

        case "2":
            searchSetTitle(2, s_depart.getName(), s_arrival.getName());
            searchSetHeader(2);
            getTrain(s_depart, s_date, s_time, s_arrival);
            console.log('Search 2');
            break;

        default:
            console.log("Unknown type of search");
            break;
    }
}

/**
 * displayResult() - Display results of a search
 * This method is called by the api.js file after a getjson request
 */
function displayResult(searchType, data){
    if(searchType == 1){
        if(data.length != 0){
            $("#search-result").html("");
        }
        for(var i = 0; i < data.length; i++){
            var div =   "<div data-role='collapsible' data-theme='b' data-collapsed='true' data-expanded-icon='carat-u' data-collapsed-icon='carat-d'>"
            div +=       "<h3><div class='ui-grid-c' align='center'>";
            div +=      "<div class='ui-block-a'>"+data[i].getAimedTime()+"</div>";
            div +=      "<div class='ui-block-b'>"+data[i].getPlatform()+"</div>";
            div +=      "<div class='ui-block-c'>"+data[i].getTime()+"</div>";
            div +=      "<div class='ui-block-d'>"+data[i].getArrival().getName()+"</div>";
            div +=      "</div></h3><div class='ui-grid-a' id='t-"+data[i].getID()+"'>";
            div +=      "<div class='ui-grid-a'><div class='ui-block-a' style='width:60%;min-height:30px;'><b>Station Name</b></div><div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'><b>Time</b></div><div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'><b>Platform</b></div></div>"
            div +=      "<div class='ui-grid-a'>";
            getTrainInfos(data[i].getID());
            div +=      "</div></div>";
            $("#search-result").append(div);
        }
        $("#search-result").trigger("create");
        hideLoader();
    }else{
        if(data.length != 0){
            $("#search-result").html("");
        }
        for(var i = 0; i < data.length; i++){
            var div =   "<div data-role='collapsible' data-theme='b' data-collapsed='true' data-expanded-icon='carat-u' data-collapsed-icon='carat-d'>";
            div +=       "<h3><div class='ui-grid-b' align='center'>";
            div +=      "<div class='ui-block-a'>"+data[i].getTime()+"</div>";
            div +=      "<div class='ui-block-b'>"+data[i].getPlatform()+"</div>";
            div +=      "<div class='ui-block-c'>"+data[i].getArrival().getName()+"</div>";
            div +=      "</div></h3><div class='ui-grid-a' id='t-"+data[i].getID()+"'>";
            div +=      "<div class='ui-grid-a'><div class='ui-block-a' style='width:60%;min-height:30px;'><b>Station Name</b></div><div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'><b>Time</b></div><div class='ui-block-b' style='width:20%;padding-left:1%;min-height:30px;'><b>Platform</b></div></div>"
            div +=      "<div class='ui-grid-a'>";
            getTrainInfos(data[i].getID());
            div +=      "</div></div>";
            $("#search-result").append(div);
        }
        $("#search-result").trigger("create");
        hideLoader();
    }
}

/**
 * switchSearchForm() - Method switching one type of search to an other by editing the form
 * @author B00290473
 */
function switchSearchForm(searchType){
    switch(searchType){
        case "1":
            $("#search-type").val("1");
            $("#station-arrival").prop("disabled", true);
            break;

        case "2":
            $("#search-type").val("2");
            $("#station-arrival").prop("disabled", false);
            break;
    }
}

/**
 * setTitle() - Search method that will change the html content of the <h3> with the id 'search-title'
 * We create the title using search informations and then just changing the html using jQuery
 * @author B00290473, B00294525
 */
function searchSetTitle(searchType, searchDeparture, searchArrival){
    switch (searchType){
        case 1:
            $("#search-title").html('Departures from <strong id="start">'+searchDeparture+"</strong>");
            break;

        case 2:
            $("#search-title").html('<strong id="start">'+searchDeparture+'</strong> to <strong  id="destination">'+searchArrival+"</strong>");
            break;
    }
}

function searchSetHeader(searchType){
    switch (searchType){
        case 1:
            $("#search-header").html("");
            $("#search-header").append("<div class='ui-grid-c' align='right' id='search-header-content'>");
            $("#search-header-content").append("<div class='ui-block-a'>Arrival time</div>");
            $("#search-header-content").append("<div class='ui-block-b'>Platform</div>");
            $("#search-header-content").append("<div class='ui-block-c'>Departure time<div>");
            $("#search-header-content").append("<div class='ui-block-d'>Final destination</div>");
            $("#search-header").append("</div>");
            $("#search-header").trigger("create");
            break;

        case 2:
            $("#search-header").html("");
            $("#search-header").append("<div class='ui-grid-b' align='center' id='search-header-content'>");
            $("#search-header-content").append("<div class='ui-block-a'>Departure time</div>");
            $("#search-header-content").append("<div class='ui-block-b'>Platform<div>");
            $("#search-header-content").append("<div class='ui-block-c'>Final destination</div>");
            $("#search-header").append("</div>");
            $("#search-header").trigger("create");
            break;
    }
}
/**
 * resetForm() - Search form will get reseted. All field will be blank except date and time.
 * In fact, we will call date and time initial function to put the actual date and time informations
 * @author B00290473, B00294525
 */
function resetForm(){
    $('#search')[0].reset();
    setSearchDate();
    $("#station-departure").val("");
    $("#station-arrival").val("");
}

/**
 * This small function switches the content of both station inputs.
 * @author B00294525
 */
function switchStations(){
    var dep = $("#station-departure").val();
    var arr = $("#station-arrival").val();
    $("#station-departure").val(arr);
    $("#station-arrival").val(dep);
}

/**
 * addFavorite() - adds the currents connection to the favorites
 * @author B00294525
 */
function addFavorite(){
    var type, dest;
    if ($('#target')){type=2;} else {type=1;}
    if ($('#destination')){dest=$('#destination').text();} else {dest=="All destinations"}
    
    var fav = new Favorite(type,$('#start').text(),dest, new Date());
    var favorites = JSON.parse(localStorage["favorites"]);
    favorites.push(fav);
    localStorage["favorites"] = JSON.stringify(favorites);
    
    var info= '<div class="ui-body" id="favoriteAdded" style="margin-bottom:2%; border-style:double; border-color:green;background:lightgreen;"><p style="color:green;text-align:center;">Favorite added!</p></div>';
    $('#page-search-content').prepend(info);
}

/**
 * listFavorites() - reads stored favorites from the localStorage and displays them in a listview.
 * @author B00294525
 */
function listFavorites(){
    var favorites = JSON.parse(localStorage["favorites"]);
    var favlist = $('#favlist');
    
    for (i = 0; i<favorites.length; i++){
        var li = $('<li></li>');
        var a = $('<a></a>');
        
        a.attr("onclick", 'searchFavorite('+favorites[i].f_type+',"'+favorites[i].f_departure+'","'+favorites[i].f_arrival+'");');
        a.attr("href", "#page-search");
        a.text(favorites[i].f_departure+" - "+favorites[i].f_arrival);
        
        li.append(a);
        favlist.append(li);
    }
    
    if ($('#favlist li')) {favlist.listview( "refresh" );}
}

/**
 * searchFavorite() - triggers a new search for a favorite.
 * @author B00294525
 */
function searchFavorite(type, departure, arrival){
   $('#station-departure').val(departure);
   $('#station-arrival').val(arrival);
   performSearch(type.toString());
}

/**
 * createLoader - creates the loader which is visible while we wait for the feeddata to arrive.
 * @author B00294525
 */
function createLoader(){
    $.mobile.loading("show", {
       text: "loading connections",
       textVisible: true,
       theme: "b",
       html: ""
    });
}

/**
 * hideLoader - hides the loader.
 * @author B00294525
 */
function hideLoader(){
    $.mobile.loading("hide");
}

/**
 * loadRecents - loads the data of recent searches
 * @author B00294525
 */
function loadRecents(){
    //create favorite for recents
    var recents = JSON.parse(localStorage["recents"]);
    
    for (i=0; i<recents.length;i++) {
        //TODO transform Favorite objects into collapsible view
    }
}
