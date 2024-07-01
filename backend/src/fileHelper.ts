import fs from 'node:fs';
import { Image } from '@shared-types'

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

export async function deleteFiles(path: string, Images: Image[]): Promise<void> {
    try {
        for (const image of Images) {
            const filePath = `${path}/${image.name}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.log(`File ${image.name} not found.`);
            }
        }
    } catch (error) {
        throw error
    }
}