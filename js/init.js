/**
 * init.js - Javascript File - RailApp
 * This javascript file manage to do every thing which have to be done when the document has been successufly loaded (body:onload)
 * @author B00290473 
 */
$(document).on("pagebeforeshow", init());

function init() {

    /**
     * For user confort, let's put the today date in the date input of the collapsed panel "New search"
     * We use $.datepicker from jQuery UI plugin
     */
    var date = new Date($.now());
    date = $.datepicker.formatDate('yy-mm-dd', new Date());
    $("#travel-date").val(date);

    /**
     * Launch unit test functions
     * Look into the javascript console to see the unit tests. Comment the line bellow to disable unit test.
     */
    //modelUnitTest(); 		/* Model unit tests */
    ApiUnitTest();		/* Api requests unit tests */
    
    /**
     * Launch notifyTest to determine api compability.
     */
    notifyTest();

} /* INIT FUNCTION END */