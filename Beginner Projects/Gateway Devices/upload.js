document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('file');
    const uploadStatus = document.getElementById('upload-status');

    if (fileInput.files.length === 0) {
        uploadStatus.textContent = 'Please select a file to upload.';
        return;
    }

    const uploadedFile = fileInput.files[0];

    // Simulate uploading the file into a Blob object
    const blob = new Blob([uploadedFile], { type: uploadedFile.type });

    // Simulated upload success
    setTimeout(() => {
        uploadStatus.textContent = 'File uploaded successfully.';
    }, 1000);
});