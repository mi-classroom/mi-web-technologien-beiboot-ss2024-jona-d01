import fs from "fs";
import sharp from "sharp";
import path from "path";

export async function compressFrames(inputPath: string, outputPath: string, opacity: number, selectedImageNames: string[]) {
    try {
        const files = await fs.promises.readdir(inputPath);
        const imageFiles = files.filter(file => file.endsWith('.png'));
        const selectedFiles = imageFiles.filter(file => selectedImageNames.includes(file));

        const compositeImages = await Promise.all(
            selectedFiles.map(async file => {
                const imageBuffer = await sharp(path.join(inputPath, file))
                    .ensureAlpha(opacity)
                    .toBuffer();
                return { input: imageBuffer };
            })
        );

        const sourceImage = await sharp(`build/frames/${selectedFiles[0]}`).ensureAlpha(0.1).toBuffer();
        await sharp(sourceImage).composite(compositeImages).toFile(`${outputPath}/output.png`);

        console.log('Created image: output.png');
    } catch (error) {
        console.error('Internal error:', error);
        throw error;
    }
}