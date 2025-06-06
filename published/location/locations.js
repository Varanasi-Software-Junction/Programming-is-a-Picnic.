
let lastPlaceName = ""; // Variable to store the last spoken place name
let watchId;


async function fetchPlaceName(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data.display_name || "Unknown location";
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Error fetching location name";
  }
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

