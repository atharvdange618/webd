function authentication() {
    // Get the values entered by the user
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var validUsername = "Admin";
    var validPassword = "Admin@123";

    if (username === validUsername && password === validPassword) {
        window.location.href = "index.html";
    } else {
        var errorArea = document.getElementById("error-area");
        errorArea.textContent = "Invalid username or password. Please try again.";
        document.getElementById('formId').reset();
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logout");

    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        window.location.href = "login.html";
    });
});

