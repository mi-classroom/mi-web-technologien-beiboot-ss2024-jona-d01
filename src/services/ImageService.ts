import fs from "fs";
import sharp from "sharp";
import path from "path";

export async function compressFrames(inputPath: string, outputPath: string, opacity: number) {
    try {
        const files = await fs.promises.readdir(inputPath);
        const imageFiles = files.filter(file => file.endsWith('.png'));

        const compositeImages = await Promise.all(
            imageFiles.map(async file => {
                const imageBuffer = await sharp(path.join(inputPath, file))
                    .ensureAlpha(opacity)
                    .toBuffer();
                return { input: imageBuffer };
            })
        );

        const sourceImage = await sharp('frames/frame-001.png').ensureAlpha(0.1).toBuffer();
        await sharp(sourceImage).composite(compositeImages).toFile(`${outputPath}/output.png`);

        console.log('Ausgabedatei erfolgreich erstellt: outputFile.png');
    } catch (error) {
        console.error('Fehler beim Verarbeiten der Bilder:', error);
        throw error;
    }
}