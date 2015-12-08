/**
 * init.js - Javascript File - RailApp
 * This javascript file manage to do every thing which have to be done when the document has been successufly loaded (body:onload)
 * @author B00290473, B00294525
 */
$(document).on("pagebeforeshow", init());

function setSearchDate(){
    var date = new Date($.now());
    date = $.datepicker.formatDate('yy-mm-dd', new Date());
    $("#travel-date").val(date);
    
    var d = new Date();
    var hours = d.getHours();
    var min = d.getMinutes();
    if (hours < 10) {hours='0'+hours}
    if (min < 10) {min='0'+min}
    var time = hours+':'+min;
    $('#travel-time').val(time);
}

function init() {

    /**
     * For user confort, let's put the today date in the date input of the collapsed panel "New search"
     * We use $.datepicker from jQuery UI plugin
     */
     setSearchDate();

    /**
     * Launch unit test functions
     * Look into the javascript console to see the unit tests. Comment the line bellow to disable unit test.
     */
    //ModelUnitTest(); 		  /* Model unit tests */
    //ApiUnitTest();		    /* Api requests unit tests */
    
    /**
     * Launch notifyTest to determine api compability.
     */
    notifyTest();

    /**
     * Initiate the autocompletion on search input
     */
     console.log(stations);
    for(var row in stations){
        $("#station-list").append("<li id='"+stations[row]+"'>"+codeToStation(stations[row])+"</li>");
    }
    
    /**
     * Changes the input to the chosen stationname and hides/displays the stationlist
     * @author B00294525
     */
    $("#station-list li").click(function(e){
        console.log($(this).attr('id'));
        $("#station-departure").val($(this).text());
        $("#station-list").css("display","none");
    });
    
    $("#station-departure").keydown(
        function(e){$("#station-list").css("display","");
    });   
    
    
} /* INIT FUNCTION END */
