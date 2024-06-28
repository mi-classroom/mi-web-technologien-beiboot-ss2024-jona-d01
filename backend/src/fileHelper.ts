import fs from 'node:fs';

export async function createDirectory(path: string) {
    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true });
        }

        fs.mkdirSync(path)
    } catch (error) {
        throw error
    }
}
