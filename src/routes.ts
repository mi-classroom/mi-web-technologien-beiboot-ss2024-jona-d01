import express from 'express';
import {extractFrames} from "./services/VideoService.ts";
import {compressFrames} from "./services/ImageService.ts";
import {createOutputFolderIfNeeded} from "./fileHelper.ts";

export const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/compressedFrames', async (req, res) => {
    const inputPath = 'build/frames';
    const outputPath = 'build/output';
    const opacity = 0.05;

    try {
        await createOutputFolderIfNeeded(outputPath);
        await compressFrames(inputPath, outputPath, opacity);
        res.send('Komprimierung abgeschlossen!');
    } catch (error) {
        console.error('Fehler bei der Komprimierung:', error);
        res.status(500).send('Interner Serverfehler');
    }
});

router.get('/extractedFrames', async (req, res) => {
    const inputPath = 'build/IMG_2940.mov';
    const outputPath = 'build/frames';
    const frameRate = 5

    try {
        await createOutputFolderIfNeeded(outputPath);
        await extractFrames(inputPath, outputPath, frameRate);
        res.send('Konvertierung abgeschlossen!');
    } catch (error) {
        console.error('Fehler beim Extrahieren der Frames:', error);
        res.status(500).send('Interner Serverfehler');
    }
});
