const requestPermissionButton = document.getElementById(
  "requestPermissionButton"
);
const startButton = document.getElementById("start-btn");

// if needed to request for permission
if (typeof DeviceMotionEvent.requestPermission === "function") {
  requestPermissionButton.style.display = "";
  startButton.disabled = true;
}

function requestPermission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          alert("Permission Granted.");
          startButton.disabled = false;
          requestPermissionButton.style.display = "none";
          window.addEventListener("devicemotion", (e) => {
            // do something with e
          });
        }
      })
      .catch(console.error);
  } else {
    alert("DeviceMotionEvent is not defined");
  }
}
