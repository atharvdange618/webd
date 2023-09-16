function authentication() {
    // Get the values entered by the user
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var validUsername = "Admin";
    var validPassword = "Admin@123";

    if (username === validUsername && password === validPassword) {
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }

    return false;
}