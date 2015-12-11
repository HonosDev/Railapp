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

/**
 * init() - This function cointains routines necessary for the initiation of the app aftter the page loaded.
 * @author B00290473, B00294525
 */
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
    for(var row in stations){
        $("#station-list-departure").append("<li id='"+stations[row]+"'>"+codeToStation(stations[row])+"</li>");
        $("#station-list-arrival").append("<li id='"+stations[row]+"'>"+codeToStation(stations[row])+"</li>");
    }
    
    /**
     * Changes the input to the chosen stationname and hides/displays the stationlist
     * @author B00294525, B00290473
     */
    $("#station-list-departure li").click(function(e){
        console.log($(this).attr('id'));
        $("#station-departure").val($(this).text());
        $("#station-list-departure").css("display","none");
    });
    $("#station-list-arrival li").click(function(e){
        console.log($(this).attr('id'));
        $("#station-arrival").val($(this).text());
        $("#station-list-arrival").css("display","none");
    });
    
    /**
     * init of the favorites array, if non existent
     * @author B00294525
     */
    if (!localStorage.getItem("favorites")){
        var favorites = [];
        localStorage["favorites"] = JSON.stringify(favorites);
    }
    
    /**
     * init of the recent-search array, if non existent
     * @author B00294525
     */
    if (!localStorage.getItem("recents")){
        var recents = [];
        localStorage["recents"] = JSON.stringify(recents);
    }

    /**
     * init of the alarm array, if non existent
     * @author B00290473
     */
    if (!localStorage.getItem("alarms")){
        var alarms = [];
        localStorage["alarms"] = JSON.stringify(alarms);
    }
 
     /**
     * if the notification setting exist, we change get the setting value
     * @author B00290473
     */
    if (localStorage.getItem("settings_notif")){
        setting_notif_enabled = localStorage["settings_notif"];
        getNotifStatus();
    }
    
    /**
     * event handling for recents collapsible
     * @author B00294525
     */
    $('#recentColl').bind('collapsibleexpand', function () {
        loadRecents();
    }).bind('collapsiblecollapse', function () {
        $("#recentsCollapsible").html("");
    });
    
    /** 
     * Let's init the geolocation 
     * @author B00290473
     */
     jQuery(window).ready(function(){
            jQuery(".geolocation-init").click(initGeolocation);
        });
    
} /* INIT FUNCTION END */