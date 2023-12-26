const fileInput = document.getElementById('file-input');
const fileContent = document.getElementById('file-content');
const fileName = document.getElementById("file-name");

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) {
        fileName.textContent = "No file selected!";
        return;
    }

    if (file.type && !file.type.startsWith("text/")) {
        alert(file.name + " is not a valid text file.");
        return;
    }

    if (file) {
        fileName.textContent = file.name;
    } else {
        fileName.textContent = "";
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
        fileContent.innerText = event.target.result;
    }
});