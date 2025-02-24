const user = sessionStorage.getItem("userName");
if (user) {
  window.location.href = "../HTML/index.html";
} else {
    window.location.href = "../HTML/login.html";
}