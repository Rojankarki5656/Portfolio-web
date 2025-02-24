// Import and initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth,signOut, updateProfile ,createUserWithEmailAndPassword,signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXdYWgyHMAzslfxiUI5yFodzJnEnj3ibs",
  authDomain: "diciplan-c8cab.firebaseapp.com",
  projectId: "diciplan-c8cab",
  storageBucket: "diciplan-c8cab.firebasestorage.app",
  messagingSenderId: "134732086536",
  appId: "1:134732086536:web:a82f73bd321354ab58c0bd",
  measurementId: "G-2NSL6HGZJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google sign-in provider

// ✅ Register User Function
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent form reload

      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User Created:", userCredential.user);
        alert("🎉 Account Created Successfully!");
        const user = userCredential.user;

        // Update display name in Firebase Auth profile
        await updateProfile(user, { displayName: name });
        sessionStorage.setItem("userUID", userCredential.user.uid);
        window.location.href = "../HTML/login.html"; // Redirect to login page
      } catch (error) {
        console.error("❌ Sign-Up Error:", error.message);
        alert(error.message);
      }
    });
  }

  // ✅ Login function (Fixed `submit` event instead of `click`)
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("userName", userCredential.user.displayName);
        alert("🎉 Login Successful!");
        window.location.href = "../HTML/index.html"; // Redirect after login
      } catch (error) {
        console.error("❌ Login Error:", error.message);
        alert("❌ Invalid email or password.");
      }
    });
  }
});

// Forgot Password function
window.forgotPassword = function () {
  const email = document.getElementById("login-email").value;
  if (!email) {
    alert("Please enter your email to reset password.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent! Check your inbox.");
    })
    .catch((error) => {
      alert(error.message);
    });
};


// Google Sign-In function
async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Welcome " + user.displayName + "!"); 
      
      // Store user session data
      sessionStorage.setItem("userName", user.displayName);
      sessionStorage.setItem("userUID", user.uid);

      // Redirect to index.html
      window.location.href = "../HTML/index.html";
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error.message);
    });
};

// Attach event listener to Google Sign-In button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("google-signin-btn");
  btn.addEventListener("click", googleSignIn);
});

// Logout function
export function logout() {
  signOut(auth)
      .then(() => {
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("userUID");
          window.location.href = "../HTML/landing.html";
      })
      .catch(error => {
          console.error("Logout failed:", error);
          alert("Logout failed! Please try again.");
      });
}