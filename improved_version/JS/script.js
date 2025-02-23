  // Load header dynamically
  import { logout } from "../JS/auths.js"; // Import the logout function

  fetch("/improved_version/HTML/header.html")
      .then(response => response.text())
      .then(data => {
          document.getElementById("header-container").innerHTML = data;

          // ✅ Wait until the header is loaded before accessing elements
          const userName = sessionStorage.getItem("userName");
          document.getElementById("user-name").innerText = userName ? userName : "Guest";

          // ✅ Attach the logout function to the dynamically loaded button
          document.getElementById("logout-btn").addEventListener("click", logout);

          document.getElementById("user-name").addEventListener("click", toggleDropdown);

          document.getElementById("user-avatar").addEventListener("click", toggleDropdown);

          document.addEventListener('DOMContentLoaded', () => {
            const userNameElement = document.getElementById('user-name'); // The element displaying the username
            const usernameEditInput = document.getElementById('username-edit'); // Input field for username
            const saveUsernameButton = document.getElementById('save-username'); // Save button
        
            // Load username from sessionStorage on page load
            const savedUsername = sessionStorage.getItem('userName');
            if (savedUsername) {
                userNameElement.textContent = savedUsername;
            }
        
            // Event listener for saving a new username
            saveUsernameButton.addEventListener('click', () => {
                const newUsername = usernameEditInput.value.trim();
                if (newUsername) {
                    userNameElement.textContent = newUsername; // Update the displayed username
                    sessionStorage.setItem('userName', newUsername); // Save to sessionStorage
                    usernameEditInput.value = ''; // Clear the input field
                }
            });
        });
        
                    // Logout Functionality
            document.getElementById('logout-btn').addEventListener('click', () => {
                // Clear session data
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('userUID');

                // Redirect to login page
                window.location.href = '/improved_version/HTML/login.html';
            });

      })
      .catch(error => console.error("Error loading header:", error));
      // Toggle Dropdown Menu
function toggleDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('visible');
}

// Close Dropdown if Clicked Outside
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    const userInfo = document.getElementById('user-info');
    if (!userInfo.contains(e.target)) {
        dropdown.classList.remove('visible');
    }
});

const userUID = sessionStorage.getItem("userUID"); // Check if user is logged in

if (!userName) {
    // If not logged in, redirect to login page
    window.location.href = "/improved_version/HTML/login.html";
}