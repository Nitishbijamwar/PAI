import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcyzeJ1aNbLk3l7qR_yYPjgoKDXIMHn7U",
  authDomain: "hotel-haven-2d599.firebaseapp.com",
  databaseURL:
    "https://hotel-haven-2d599-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-haven-2d599",
  storageBucket: "hotel-haven-2d599.firebasestorage.app",
  messagingSenderId: "446324701565",
  appId: "1:446324701565:web:1663b2cf470c0b757eb414",
  measurementId: "G-L2NDRDR8JM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const searchInput = document.getElementById("search");
const ratingFilter = document.getElementById("ratingFilter");
const availableFilter = document.getElementById("availableFilter");

searchInput.addEventListener("input", renderFilteredHotels);
ratingFilter.addEventListener("change", renderFilteredHotels);
availableFilter.addEventListener("change", renderFilteredHotels);

async function fetchHotels() {
  const hotelsRef = ref(db, "hotels");
  const snapshot = await get(hotelsRef);
  if (snapshot.exists()) {
    Object.values(snapshot.val());
  }
  return [];
}
async function renderFilteredHotels() {
  const query = searchInput.value.toLowerCase();
  const rating = ratingFilter.value;
  const showAvailable = availableFilter.checked;

  const hotels = await fetchAllHotels();
  const hotelList = document.getElementById("hotel-list");
  hotelList.innerHTML = "";
  hotels.forEach((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(query) ||
      hotels.forEach((hotel) => {
        hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query);
        const matchesRating = !rating || hotel.rating >= parseFloat(rating);
        const matchesAvailability = !showAvailable || hotel.available;
        if (matchesSearch && matchesRating && matchesAvailability) {
          const div = document.createElement("div");
          div.className = "hotel-card";
          div.innerHTML = `<h3>${hotel.name}</h3>
        <p><strong>Location:</strong>${hotel.location}</p>
        <p><strong>Price:</strong>${hotel.price}</p>
        <p><strong>Rating:</strong>${hotel.rating}</p>
        <p><strong>Amenities:</strong>${hotel.amenities.join(" ")}</p>
        <p><strong>Available:</strong>${hotel.available ? "Yes" : "No"}</p>
        `;
          hotelList.appendChild(div);
        }
      });
  });
}
renderFilteredHotels();
