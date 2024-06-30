import fs from "fs";
import sharp from "sharp";
import path from "path";

const opacity = 0.05;

export async function compressFrames(inputPath: string, outputPath: string) {
    try {
        const files = await fs.promises.readdir(inputPath);

        const compositeImages = await Promise.all(
            files.map(async file => {
                const imageBuffer = await sharp(path.join(inputPath, file))
                    .ensureAlpha(opacity)
                    .toBuffer();
                return { input: imageBuffer };
            })
        );

        const sourceImage = await sharp(`${inputPath}/${files[0]}`).ensureAlpha(0.1).toBuffer();
        await sharp(sourceImage).composite(compositeImages).toFile(`${outputPath}/output.png`);

        console.log('Created image: output.png');
    } catch (error) {
        console.error('Internal error:', error);
        throw error;
    }
}