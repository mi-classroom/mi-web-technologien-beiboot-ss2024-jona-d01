import fs from 'fs';

export async function createOutputFolderIfNeeded(outputPath: string) {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
        console.log(`Ausgabeordner erstellt: ${outputPath}`);
    }
}
