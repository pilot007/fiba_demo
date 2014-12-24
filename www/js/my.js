/**
 * @author Selim.goktas
 */
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}


function loadMapScript(callbackFunctionName) {
       var keyForBrowser = 'AIzaSyBwH3SfcJdQu0Z-D_JbyfN4FQMt67Lo3V8';
       
       // Asynchronous Loading
       // https://developers.google.com/maps/documentation/javascript/examples/map-simple-async
       //var keyForBrowser = appCodes.map.keyForBrowser;

       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true';
       //&libraries=geometry';
       script.src += '&key=' + keyForBrowser;
       script.src += '&callback=' + callbackFunctionName;
       document.body.appendChild(script);
}
