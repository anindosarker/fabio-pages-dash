// Check if uid already exist in cookie.
if (!getCookie("uid")) {
  // if not, then create a new uid and store it in cookie.
  document.cookie =
    "uid=U" +
    Date.now().toString(36).toUpperCase() +
    "; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/";
}
// -------------------------------------------

document.getElementById("uid").innerHTML = getCookie("uid");

// This setInterval function increment the value of "timeSpent" variable each second.
var timeSpent = 0;
var timeSpentInterval = setInterval(function () {
  timeSpent++;
  document.getElementById("time-spent").innerHTML = timeSpent + "s";
}, 1000);
// ---------------------------------------------

// The beforeunload event triggers right before unloading of the window has begun
window.addEventListener("beforeunload", function () {
  // When user close or refresh the web page, sendBeacon method asynchronously sends a small amount of data over HTTP to a web server.
  navigator.sendBeacon(
    "http://localhost/updatetimespentonpage",
    JSON.stringify({
      uid: getCookie("uid"),
      timeSpentOnPage: timeSpent,
    })
  );
});
// ---------------------------------------------

// Method used to get cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
