/**
 * notifications.js - This file will contains all methods which are needed to provide the notifications for the alarms
 * @author B00294525
 */

/**
 * This fucntion tests if the web notifications api is supported.
 * @return boolean 
 * @author B00294525
 */

function notifyTest() {
    if (!('Notification' in window)) {
        //error
        $('#APIerror').css( "display", "inherit" );
        return false;
    } else {
        //success
        return true;
    }
}

/**
 * This funcion sends a notification.
 * @param {String} title notification heading
 * @param {String} msg notification message
 * @author B00294525
 */

function notify(title, msg) {
    
    //example options
    options = {
              body: msg,
              tag: 'preset',
            };
    
    if (notifyTest){
        Notification.requestPermission(function() {
            var notification = new Notification(title, options);
        });        
    }    

}