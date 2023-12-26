// Variables to store DOM elements and initial data
const nameInput = document.getElementById("name-input"); // Input field for name
const emailInput = document.getElementById("email-input"); // Input field for email
const addBtn = document.getElementById("add-btn"); // Button to add user
const tableBody = document.getElementById("table-body"); // Table body to display users
const updateNameInput = document.getElementById("update-name-input"); // Input field for updating name
const updateEmailInput = document.getElementById("update-email-input"); // Input field for updating email
const updateBtn = document.getElementById("update-btn"); // Button to update user
const cancelBtn = document.getElementById("cancel-btn"); // Button to cancel update
let users = JSON.parse(localStorage.getItem("users")) || []; // Array to store user data
let currentUserId = null; // Variable to track current user being updated
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // Regular expression for email validation

// Function to render users in the table
function renderTable() {
    // Clear table contents
    tableBody.innerHTML = "";
    // Loop through users and create table rows
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const tr = document.createElement("tr"); // Create table row
        // Create table data for user properties
        const idTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const emailTd = document.createElement("td");
        const actionsTd = document.createElement("td");
        // Create buttons for edit and delete actions
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        // Set button classes and text
        editBtn.className = "edit-btn";
        deleteBtn.className = "delete-btn";
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        // Set event listeners for edit and delete buttons
        editBtn.addEventListener("click", () => {
            showUpdateForm(user.id); // Show update form for the selected user
        });
        deleteBtn.addEventListener("click", () => {
            deleteUser(user.id); // Delete the selected user
        });
        // Append buttons to actions cell, user data to respective cells, and cells to row
        idTd.innerText = user.id;
        nameTd.innerText = user.name;
        emailTd.innerText = user.email;
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(actionsTd);
        tableBody.appendChild(tr); // Append row to table body
    }
}

// Function to add a new user
function addUser() {
    // Get values from input fields
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    // Validate email format
    if (email.match(validRegex)) {
        // Check if name and email are provided
        if (name && email != null) {
            // Generate a unique ID for the new user
            // (assuming IDs are unique integers)
            var id = 1;
            var val = users.map(function (x) { return x.id; }).indexOf(id);
            while (val != -1) {
                id++;
                val = users.map(function (x) { return x.id; }).indexOf(id);
            }
            // Create a new user object
            const user = {
                id: id,
                name: name,
                email: email,
            };
            // Add the new user to the array
            users.push(user);
            // Update local storage with the modified user list
            localStorage.setItem("users", JSON.stringify(users));
            // Clear input fields
            nameInput.value = "";
            emailInput.value = "";
            // Update the displayed table
            renderTable();
        } else {
            alert("Name is Required");
        }
    } else {
        alert("Invalid email address!");
    }
}

// Function to update an existing user
function updateUser() {
    // Get updated values from input fields
    const name = updateNameInput.value;
    const email = updateEmailInput.value;
    // Validate email format
    if (email.match(validRegex)) {
        // Find the index of the user to be updated
        const index = users.findIndex((user) => user.id === currentUserId);
        if (index !== -1) {
            // Update user data with new values
            users[index].name = name;
            users[index].email = email;
            // Update local storage with the modified user list
            localStorage.setItem("users", JSON.stringify(users));
            // Hide the update form and render the updated table
            hideUpdateForm();
            renderTable();
        }
    } else {
        alert("Invalid email address!");
    }
}

// Function to show the update form for a specific user
function showUpdateForm(userId) {
    // Find the user by ID
    const user = users.find((user) => user.id === userId);
    if (user) {
        // Populate input fields with user data
        updateNameInput.value = user.name;
        updateEmailInput.value = user.email;
        currentUserId = user.id; // Set current user ID being updated
        // Add event listeners and display update form elements
        updateBtn.addEventListener("click", updateUser);
        cancelBtn.addEventListener("click", hideUpdateForm);
        updateBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";
        updateNameInput.style.display = "inline-block";
        updateEmailInput.style.display = "inline-block";
        document.getElementById("update-container").style.display = "block";
    }
}

// Function to hide the update form
function hideUpdateForm() {
    // Clear input fields and reset current user ID
    updateNameInput.value = "";
    updateEmailInput.value = "";
    currentUserId = null;
    // Remove event listeners and hide update form elements
    updateBtn.removeEventListener("click", updateUser);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
    updateNameInput.style.display = "none";
    updateEmailInput.style.display = "none";
    document.getElementById("update-container").style.display = "none";
}

// Function to delete a user
function deleteUser(userId) {
    // Filter out the user to be deleted
    users = users.filter((user) => user.id !== userId);
    // Update local storage with the modified user list
    localStorage.setItem("users", JSON.stringify(users));
    // If there are no users left, hide the update form
    if (users.length == 0) {
        hideUpdateForm();
    }
    // Render the updated table
    renderTable();
}

// Event listener for adding a new user
addBtn.addEventListener("click", addUser);

// Initialize the table with existing user data (if any)
renderTable();
