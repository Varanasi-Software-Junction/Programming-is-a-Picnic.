
let lastPlaceName = ""; // Variable to store the last spoken place name
let watchId;
const pkey="one1";
let currentdata=[];
getstoragedata();
async function fetchPlaceName(latitude, longitude) {
  try {
    // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);

    const apiKey = "95ffeb9038034ad0b306becc0e96dfac";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=hi`;
    const response = await fetch(url);


    const data = await response.json();
    if (data.results && data.results.length > 0) {
      // return data.results[0].formatted; // Get the formatted address of the first result
      const placeName = data.results[0].formatted;
      
      return placeName;
    }
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Error fetching location name";
  }
}
// save to local storage
function savetolocalstorage(pkey,placeName,latitude,longitude)
{
const dateTime = new Date().toISOString();
jsonstring=`{"datetime":"${dateTime}","placename":"${placeName}","lat":"${latitude}","long":"${longitude}"}`.trim();

currentdata.push(jsonstring);
currentdata=JSON.stringify(currentdata);
 localStorage.setItem(pkey,currentdata);
// localStorage.setItem("dateTime",dateTime);
// localStorage.setItem("placename",placeName);
console.table(jsonstring);
// console.table(currentdata);
console.table(JSON.parse(currentdata));
}
function getstoragedata(){
 let data= localStorage.getItem(pkey);
 if(data)
 {
  currentdata=JSON.parse(data);
 }
 else
 currentdata=[];
}
function startWatching() {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(async function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      document.getElementById('latitude').textContent = latitude;
      document.getElementById('longitude').textContent = longitude;

      const placeName = await fetchPlaceName(latitude, longitude);
      document.getElementById('place-name').textContent = placeName;

      // Speak the place name if it has changed
      if (placeName !== lastPlaceName) {
        speak(placeName);
        getstoragedata();
        savetolocalstorage(pkey,placeName,latitude,longitude);
        lastPlaceName = placeName; // Update the last spoken place name
      }
    }, function(error) {
      alert("Error retrieving location: " + error.message);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Optionally stop watching if needed
function stopWatching() {
  if (watchId !== undefined) {
    navigator.geolocation.clearWatch(watchId);
  }
}

