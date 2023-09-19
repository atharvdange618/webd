document.getElementById('request-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileNameInput = document.querySelector('.request-input');
    const fileDisplay = document.getElementById('file-display');

    // Simulated file content (blob)
    const simulatedFile = new Blob(['This is a sample file content.'], { type: 'text/plain' });

    if (fileNameInput.value.trim() === '') {
        alert('Please enter a file name.');
        return;
    }

    // Simulated request success
    setTimeout(() => {
        fileDisplay.innerHTML = `
            <p><strong>File Name:</strong> ${fileNameInput.value}</p>
            <p><strong>File Content:</strong></p>
            <pre>${simulatedFile}</pre>
        `;
    }, 1000);
});