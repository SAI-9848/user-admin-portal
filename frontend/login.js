import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOodV_JT4H2Wu0Z3j2EYK0VYCX5w2udHI",
  authDomain: "skip-analytics-19d6a.firebaseapp.com",
  projectId: "skip-analytics-19d6a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Get input elements FIRST
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "user.html";
  } catch (err) {
    // 🔹 Custom message for non-Firebase users
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/invalid-credential" ||
      err.code === "auth/wrong-password"
    ) {
      alert("Only Firebase authenticated users can login");
    } else {
      alert("Login failed. Please try again.");
    }
  }
});
