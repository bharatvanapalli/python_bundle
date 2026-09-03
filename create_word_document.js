/**
 * Zero-install Word document creation utility (Node.js)
 * Run directly with: node create_word_document.js
 */
import * as docx from 'docx';
import fs from 'fs';
import path from 'path';

export async function generateWordDocument(outputPath = 'output_document.docx', title = 'Document Title', sections = []) {
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    text: title,
                    heading: docx.HeadingLevel.TITLE,
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: "Generated autonomously by AI using pre-bundled tools.", italic: true })
                    ],
                    spacing: { after: 200 }
                }),
                ...sections.map(sec => new docx.Paragraph({
                    text: sec,
                    spacing: { after: 150 }
                }))
            ]
        }]
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully created Word document: ${outputPath} (${buffer.length} bytes)`);
    return outputPath;
}

if (process.argv[1] && process.argv[1].endsWith('create_word_document.js')) {
    generateWordDocument(
        'sample_generated.docx',
        'AI Project Execution Plan',
        [
            '1. Objective: Deliver zero-install automated document and spreadsheet generation capabilities.',
            '2. Architecture: Fully pre-bundled node_modules and Python site-packages for offline air-gapped runtimes.',
            '3. Verification: All libraries verified and operational.'
        ]
    );
}
