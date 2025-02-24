function checkLoginStatus(destination) {
    const user = sessionStorage.getItem("userName");
    if (user) {
        window.location.href = destination;
    } else {
        window.location.href = "login.html";
    }
}
