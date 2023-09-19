// Sample file data
const files = [
    {
        name: 'Document.pdf',
        type: 'PDF',
        size: '2.5 MB',
    },
    {
        name: 'Image.jpg',
        type: 'JPEG',
        size: '1.8 MB',
    },
    {
        name: 'Spreadsheet.xlsx',
        type: 'Excel',
        size: '3.1 MB',
    },
    // Add more file objects as needed
];

function updateTable(filteredFiles) {
    const tableBody = document.getElementById('file-rows');
    const mappedRecords = filteredFiles.map(file => {
        return `<tr>
            <td class="file-name">${file.name}</td>
            <td>${file.type}</td>
            <td>${file.size}</td>
        </tr>`;
    });
    tableBody.innerHTML = mappedRecords.join('');
    const rowCount = filteredFiles.length;
    const tableRowCount = document.querySelector('.table-row-count');
    tableRowCount.innerHTML = `(${rowCount}) Files`;
}

document.addEventListener('DOMContentLoaded', function () {
    updateTable(files);

    const searchButton = document.getElementById('search-button');
    const fileSearchInput = document.getElementById('file-search');

    searchButton.addEventListener('click', function () {
        const searchTerm = fileSearchInput.value.trim().toLowerCase();
        const filteredFiles = files.filter(file => file.name.toLowerCase().includes(searchTerm));
        updateTable(filteredFiles);
    });
});
