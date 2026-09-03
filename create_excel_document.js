/**
 * Zero-install Excel document creation utility (Node.js)
 * Run directly with: node create_excel_document.js
 */
import ExcelJS from 'exceljs';

export async function generateExcelDocument(outputPath = 'output_spreadsheet.xlsx', sheetName = 'Summary Data', data = []) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'AI Autonomous Bundle';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(sheetName);

    sheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Task Name', key: 'task', width: 35 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Status', key: 'status', width: 18 },
        { header: 'Execution Cost', key: 'cost', width: 18 },
    ];

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4E79' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    const sampleRows = data.length > 0 ? data : [
        { id: 101, task: 'Word Document Generation (.docx)', category: 'Reporting', status: 'Completed', cost: 150.00 },
        { id: 102, task: 'Excel Spreadsheet Automation (.xlsx)', category: 'Analytics', status: 'Completed', cost: 220.50 },
        { id: 103, task: 'AlloyDB Cloud SQL Sanity Checks', category: 'Database', status: 'Verified', cost: 310.00 },
        { id: 104, task: 'Zero-Install Offline Packaging', category: 'Deployment', status: 'Ready', cost: 180.00 },
    ];

    sampleRows.forEach(row => {
        const added = sheet.addRow(row);
        added.getCell(5).numFmt = '$#,##0.00';
    });

    await workbook.xlsx.writeFile(outputPath);
    console.log(`Successfully created Excel spreadsheet: ${outputPath}`);
    return outputPath;
}

if (process.argv[1] && process.argv[1].endsWith('create_excel_document.js')) {
    generateExcelDocument('sample_generated.xlsx');
}
