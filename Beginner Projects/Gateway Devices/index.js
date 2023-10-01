function authentication() {
    // Get the values entered by the user
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Set the valid username and password
    var validUsername = "Admin";
    var validPassword = "Admin@123";

    // Check if the username and password match the valid values
    if (username === validUsername && password === validPassword) {
        // If the username and password match, redirect to the index.html page
        window.location.href = "index.html";
    } else {
        // If the username and password don't match, display an error message
        var errorArea = document.getElementById("error-area");
        errorArea.textContent = "Invalid username or password. Please try again.";
        // Reset the form
        document.getElementById('formId').reset();
    }

    // Return false to prevent the default action
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the logout link element
    const logoutLink = document.getElementById("logout");

    // Add an event listener to the logout link
    logoutLink.addEventListener("click", function (e) {
        // Prevent the default action
        e.preventDefault();

        // Redirect to the login.html page
        window.location.href = "login.html";
    });
});