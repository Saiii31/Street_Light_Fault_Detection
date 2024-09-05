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

function checkBulbsStatus(sunIntensity, bulb1Intensity, bulb2Intensity) {
  const bulb1Element = document.getElementById('bulb1');
  const bulb1Status = document.getElementById('bulb1-status');
  const bulb2Element = document.getElementById('bulb2');
  const bulb2Status = document.getElementById('bulb2-status');

  if (sunIntensity < 50 && bulb1Intensity > 100) {
    bulb1Element.style.color = 'green';
    bulb1Status.textContent = 'Working';
  } else {
    bulb1Element.style.color = 'red';
    bulb1Status.textContent = 'Not Working';
  }

  if (sunIntensity < 50 && bulb2Intensity > 100) {
    bulb2Element.style.color = 'green';
    bulb2Status.textContent = 'Working';
  } else {
    bulb2Element.style.color = 'red';
    bulb2Status.textContent = 'Not Working';
  }
}

function fetchData() {
  const sunRef = ref(database, 'Street/sun/lightIntensity');
  const bulb1Ref = ref(database, 'Street/bulb1/lightIntensity');
  const bulb2Ref = ref(database, 'Street/bulb2/lightIntensity');

  let sunIntensity, bulb1Intensity, bulb2Intensity;

  onValue(sunRef, (snapshot) => {
    sunIntensity = snapshot.val();
    checkBulbsStatus(sunIntensity, bulb1Intensity, bulb2Intensity);
  });

  onValue(bulb1Ref, (snapshot) => {
    bulb1Intensity = snapshot.val();
    checkBulbsStatus(sunIntensity, bulb1Intensity, bulb2Intensity);
  });

  onValue(bulb2Ref, (snapshot) => {
    bulb2Intensity = snapshot.val();
    checkBulbsStatus(sunIntensity, bulb1Intensity, bulb2Intensity);
  });
}

fetchData();
