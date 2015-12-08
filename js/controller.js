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
 * @author B00290473
 */
function performSearch(typeOfSearch){
    var s_depart    = new Station($("#station-departure").val(), stationToCode($("#station-departure").val()));
    var s_arrival   = new Station($("#station-arrival").val(), stationToCode($("#station-arrival").val()));
    var s_date      = $("#travel-date").val();
    var s_time      = $("#travel-time").val();

    switch (typeOfSearch){
        case "1":
            searchSetTitle(1, s_depart.getName());
            searchSetHeader(1);
            getTrain(s_depart, s_date, s_time);
            break;

        case "2":
            searchSetTitle(2, s_depart.getName(), s_arrival.getName());
            searchSetHeader(2);
            getTrain(s_depart, s_date, s_time, s_arrival);
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
            div +=      "</div></h3><ul data-role='listview'>";
            div +=      "<li>From <strong>"+data[i].getOrigin().getName()+"</strong></li>";
            div +=      "</ul></div>";
            $("#search-result").append(div);
        }
        $("#search-result").trigger("create");
    }else{
        if(data.length != 0){
            $("#search-result").html("");
        }
        for(var i = 0; i < data.length; i++){
            var div =   "<div data-role='collapsible' data-theme='b' data-collapsed='true' data-expanded-icon='carat-u' data-collapsed-icon='carat-d'>"
            div +=       "<h3><div class='ui-grid-b' align='center'>";
            div +=      "<div class='ui-block-a'>"+data[i].getTime()+"</div>";
            div +=      "<div class='ui-block-b'>"+data[i].getPlatform()+"</div>";
            div +=      "<div class='ui-block-c'>"+data[i].getArrival().getName()+"</div>";
            div +=      "</div></h3><ul data-role='listview'>";
            div +=      "<li>From <strong>"+data[i].getOrigin().getName()+"</strong></li>";
            div +=      "</ul></div>";
            $("#search-result").append(div);
        }
        $("#search-result").trigger("create");
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
            $("#button-from-search").addClass("ui-state-disabled");
            $("#button-from-to-search").removeClass("ui-state-disabled");
            break;

        case "2":
            $("#search-type").val("2");
            $("#station-arrival").prop("disabled", false);
            $("#button-from-to-search").addClass("ui-state-disabled");
            $("#button-from-search").removeClass("ui-state-disabled");
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
 * @author B00290473
 */
function resetForm(){
    $('#search')[0].reset();
    setSearchDate();
}
