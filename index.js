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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch and update status bar
function fetchDataAndUpdateBar(dataRef, barId) {
    const barElement = document.getElementById(barId);

    // Fetch data and update bar
    let newData = 0; // Initialize newData outside the callback function

onValue(ref(database, dataRef), function(snapshot) {
  let data = snapshot.val();
  newData += data; // Accumulate data into newData
  barElement.textContent = `${newData} W`; // Display the accumulated newData
});

}

// References to the data you want to fetch
const dataRef1 = 'Street/sun/TotalEnergy';

// Fetch data and update bars
fetchDataAndUpdateBar(dataRef1, 'bulb-bar');