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
