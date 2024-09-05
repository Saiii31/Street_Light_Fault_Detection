import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGEthzjsoLHxmGcDGuea-vwILrpubFQUw",
  authDomain: "iotcp-acf25.firebaseapp.com",
  databaseURL: "https://iotcp-acf25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotcp-acf25",
  storageBucket: "iotcp-acf25.appspot.com",
  messagingSenderId: "794835768753",
  appId: "1:794835768753:web:d79360c50afe0b710bd990",
  measurementId: "G-1FM2L2XCWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let sunIntensity, bulb1Intensity, bulb2Intensity;
let bulb1Power, bulb2Power;

function updateBulbStatus() {
  const bulb1Element = document.getElementById('bulb1');
  const bulb1Info = document.getElementById('bulb1-info');
  const bulb2Element = document.getElementById('bulb2');
  const bulb2Info = document.getElementById('bulb2-info');

  if (sunIntensity < 50 && bulb1Intensity > 100) {
    bulb1Element.style.color = 'green';
    bulb1Info.innerHTML = `Power: ${bulb1Power} Watt<br>Status: Working`;
  }
  else if(sunIntensity>50){
    bulb1Element.style.color = 'yellow';
    bulb1Info.innerHTML = `Status: Day Time`;
  } 
  else {
    bulb1Element.style.color = 'red';
    bulb1Info.innerHTML = `Status: Not Working`;
  }

  if (sunIntensity < 50 && bulb2Intensity > 100) {
    bulb2Element.style.color = 'green';
    bulb2Info.innerHTML = `Power: ${bulb2Power} Watt<br>Status: Working`;
  }



  else if(sunIntensity>50){
    bulb2Element.style.color = 'yellow';
    bulb2Info.innerHTML = `Status: Day Time`;
  }  
  else {
    bulb2Element.style.color = 'red';
    bulb2Info.innerHTML = `Status: Not Working`;
  }
}

function fetchData(bulbId, powerRef, intensityRef) {
  onValue(powerRef, (snapshot) => {
    const data = snapshot.val();
    if (bulbId === 'bulb1') {
      bulb1Power = data;
    } else if (bulbId === 'bulb2') {
      bulb2Power = data;
    }
    updateBulbStatus();
  });

  onValue(intensityRef, (snapshot) => {
    const data = snapshot.val();
    if (bulbId === 'bulb1') {
      bulb1Intensity = data;
    } else if (bulbId === 'bulb2') {
      bulb2Intensity = data;
    }
    updateBulbStatus();
  });

  onValue(sunRef, (snapshot) => {
    sunIntensity = snapshot.val();
    updateBulbStatus();
  });
}

// References to the data you want to fetch
const sunRef = ref(database, 'Street/sun/lightIntensity0');
const bulb1PowerRef = ref(database, 'Street/bulb1/power1');
const bulb1IntensityRef = ref(database, 'Street/bulb1/lightIntensity1');
const bulb2PowerRef = ref(database, 'Street/bulb2/power2');
const bulb2IntensityRef = ref(database, 'Street/bulb2/lightIntensity2');

// Fetch data
fetchData('bulb1', bulb1PowerRef, bulb1IntensityRef);
fetchData('bulb2', bulb2PowerRef, bulb2IntensityRef);

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('bulb1').addEventListener('click', function() {
      const googleMapsUrl = 'https://www.google.com/maps/dir//18.4639051,73.8680106/@18.4637021,73.867933,20.43z/data=!4m2!4m1!3e2?entry=ttu';
      window.open(googleMapsUrl, '_blank');
    });

      document.getElementById('bulb2').addEventListener('click', function() {
        const googleMapsUrl = 'https://www.google.com/maps/dir//18.4639742,73.8688549/@18.4643247,73.8688945,20z/data=!4m2!4m1!3e2?entry=ttu';
        window.open(googleMapsUrl, '_blank');
      });
});


