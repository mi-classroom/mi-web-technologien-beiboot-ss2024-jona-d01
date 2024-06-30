import fs from 'node:fs';
import e from 'express'

export async function createDirectory(path: string): Promise<void> {
    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true });
        }

        fs.mkdirSync(path)
    } catch (error) {
        throw error
    }
}

export async function deleteFiles(path: string, fileNames: string[]): Promise<void> {
    try {
        for (const fileName of fileNames) {
            const filePath = `${path}/${fileName}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.log(`File ${fileName} not found.`);
            }
        }
    } catch (error) {
        throw error
    }
}