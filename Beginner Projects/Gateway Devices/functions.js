function goToHome() {
    window.location.href = 'index.html';
}

function downloadFile() {
    const fileUrl = 'your_file_url_here'; // Replace with the actual file URL
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'filename.ext'; // Replace with the desired file name
    link.click();
}
function uploadFile(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file) {
        console.log('Uploading file:', file.name);
        // Add your upload logic here
    } else {
        alert('Please select a file to upload.');
    }
}

// Add an event listener to the form's submit event
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', uploadFile);

function requestFile() {
    window.location.href = 'request.html'; // Replace 'request.html' with your actual request form page URL
}
function deleteFile() {
    const fileId = 'your_file_id_here'; // Replace with the actual file ID

    fetch(`/deleteFile?id=${fileId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                // Handle success (e.g., update the UI)
                alert('File deleted successfully');
            } else {
                // Handle error
                alert('Error deleting file');
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.error('Error:', error);
        });
}
function browseDirectory() {
    window.location.href = 'directory.html'; // Replace 'directory.html' with your actual directory page URL
}
function logout() {
    // Clear user authentication or session data (e.g., tokens, cookies, etc.)
    // Redirect to the login page
    window.location.href = 'login.html'; // Replace 'login.html' with your actual login page URL
}
