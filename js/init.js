/**
 * init.js - Javascript File - RailApp
 * This javascript file manage to do every thing which have to be done when the document has been successufly loaded (body:onload)
 */

function init() {

    /**
     * For user confort, let's put the today date in the date input of the collapsed panel "New search"
     * We use $.datepicker from jQuery UI plugin
     */
    var date = new Date($.now());
    console.log(date.getFullYear()+"-"+date.getMonth()+"-"+date.getUTCDay());
    date = $.datepicker.formatDate('yy-mm-dd', new Date());
    console.log(date);
    $("#travel-date").val(date);



} /* INIT FUNCTION END */