document.getElementById('convertToJSON').addEventListener('click', convertCSVToJSON);
document.getElementById('convertToCSV').addEventListener('click', convertJSONToCSV);
document.getElementById('clearCSV').addEventListener('click', clearCSVTextAreas);
document.getElementById('clearJSON').addEventListener('click', clearJSONTextAreas);

function convertCSVToJSON() {
    const csvText = document.getElementById('csvInput').value;
    if (!csvText) {
        alert('CSV input is empty!');
        return;
    }
    try {
        const jsonOutput = csvToJSON(csvText);
        document.getElementById('jsonOutput').value = JSON.stringify(jsonOutput, null, 2);
    } catch (error) {
        alert('Invalid CSV format!');
    }
}

function convertJSONToCSV() {
    const jsonText = document.getElementById('jsonInput').value;
    if (!jsonText) {
        alert('JSON input is empty!');
        return;
    }
    try {
        const csvOutput = jsonToCSV(JSON.parse(jsonText));
        document.getElementById('csvOutput').value = csvOutput;
    } catch (error) {
        alert('Invalid JSON format!');
    }
}

function clearCSVTextAreas() {
    document.getElementById('csvInput').value = '';
    document.getElementById('jsonOutput').value = '';
}

function clearJSONTextAreas() {
    document.getElementById('jsonInput').value = '';
    document.getElementById('csvOutput').value = '';
}

function csvToJSON(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return result;
}

function jsonToCSV(json) {
    const keys = Object.keys(json[0]);
    const csv = [keys.join(',')];

    for (const obj of json) {
        const values = keys.map(key => obj[key]);
        csv.push(values.join(','));
    }
    return csv.join('\n');
}
