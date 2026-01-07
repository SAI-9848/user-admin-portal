import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCOodV_JT4H2Wu0Z3j2EYK0VYCX5w2udHI",
  authDomain: "skip-analytics-19d6a.firebaseapp.com",
  projectId: "skip-analytics-19d6a",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const container = document.getElementById("container");
const logoutBtn = document.getElementById("logoutBtn");

// Auth guard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    fetchProducts();
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

// Fetch products
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:3000/Products");
    const data = await res.json();

    container.innerHTML = "";
    data.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h4>${p.name}</h4>
        <img src="${p.image}" alt="${p.name}" />
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load products", err);
  }
}
