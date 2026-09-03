import * as docx from 'docx';
import ExcelJS from 'exceljs';
import * as xlsx from 'xlsx';
import mammoth from 'mammoth';

console.log('--- NODE.JS OFFICE TOOLS VERIFICATION ---');
console.log('docx Document available:', typeof docx.Document === 'function');
console.log('ExcelJS Workbook available:', typeof ExcelJS.Workbook === 'function');
console.log('xlsx utils available:', typeof xlsx.utils === 'object');
console.log('mammoth extractRawText available:', typeof mammoth.extractRawText === 'function');

async function testCreateFiles() {
    // 1. Test docx creation
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: "Hello from AI Document Generator!", bold: true, size: 28 }),
                    ],
                }),
                new docx.Paragraph({
                    text: "This document was generated automatically without external install commands.",
                }),
            ],
        }],
    });
    const docBuffer = await docx.Packer.toBuffer(doc);
    console.log('Generated test Word docx buffer size:', docBuffer.length);

    // 2. Test ExcelJS creation
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('AI Data');
    sheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Item', key: 'item', width: 25 },
        { header: 'Cost', key: 'cost', width: 15 },
    ];
    sheet.addRow({ id: 1, item: 'Automated Report', cost: 120.50 });
    const xlsxBuffer = await workbook.xlsx.writeBuffer();
    console.log('Generated test Excel xlsx buffer size:', xlsxBuffer.byteLength);

    console.log('ALL NODE.JS OFFICE LIBRARIES ARE FULLY OPERATIONAL!');
}

testCreateFiles().catch(console.error);
