import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

const ExportButtons = ({ data }) => {
    const copyToClipboard = () => {
        // Create header row
        const headers = ['ID', 'Name', 'Age', 'Email', 'Role'];

        // Convert data to tab-separated values
        const tsv = [
            headers.join('\t'),
            ...data.map(row =>
                `${row.id}\t${row.name}\t${row.age}\t${row.email}\t${row.role}`
            )
        ].join('\n');

        // Copy to clipboard
        navigator.clipboard.writeText(tsv)
            .then(() => alert('Table data copied to clipboard'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "export.xlsx");
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Name', 'Age', 'Email', 'Role'];
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['ID', 'Name', 'Age', 'Email', 'Role']],
            body: data.map(row => [row.id, row.name, row.age, row.email, row.role]),
        });
        doc.save("export.pdf");
    };

    const print = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Exported Data</h1>');
        printWindow.document.write('<table>');
        printWindow.document.write('<thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Email></th><th>Role</th></tr></thead>');
        printWindow.document.write('<tbody>');
        data.forEach(row => {
            printWindow.document.write(`<tr><td>${row.id}</td><td>${row.name}</td><td>${row.age}</td><td>${row.email}</td><td>${row.role}</td></tr>`);
        });
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="flex justify-center space-x-4 p-4">
            <button onClick={copyToClipboard} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                COPY
            </button>
            <button onClick={exportToExcel} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                EXCEL
            </button>
            <button onClick={exportToCSV} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                CSV
            </button>
            <button onClick={exportToPDF} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                PDF
            </button>
            <button onClick={print} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                PRINT
            </button>
        </div>
    );
}

ExportButtons.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    })).isRequired
};

export default ExportButtons;
