import express from 'express';
import {extractFrames} from "./services/VideoService.ts";
import {compressFrames} from "./services/ImageService.ts";
import {createOutputFolderIfNeeded} from "./fileHelper.ts";
import multer from 'multer';
import e from "express";

export const router = express.Router();
const frameRate = 5;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await createOutputFolderIfNeeded('build/video');
        cb(null, 'build/video');
    },
    filename: (req, file, cb) => {
        cb(null, 'video.mov');
    },
});
const uploadVideo = multer({ storage });

router.post('/upload', uploadVideo.single('video'), (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
})

router.post('/convertImage', async (req, res) => {
    const inputPath = 'build/frames';
    const outputPath = 'build';
    const opacity = 0.05;
    try {
        const images = req.body.images;
        const selectedImageNames: string[] = images
            .filter((image: { selected: boolean; }) => image.selected)
            .map((image: { name: string; }) => image.name);
        await createOutputFolderIfNeeded(outputPath);
        await compressFrames(inputPath, outputPath, opacity, selectedImageNames);
        res.send('Created Picture successfully.');
    } catch (error) {
        console.error('Error creating picture:', error);
        res.status(500).send('Internal error');
    }
});

router.get('/extractedFrames', async (req, res) => {
    const inputPath = 'build/video/video.mov';
    const outputPath = 'build/frames';
    const resolution = '1920x1080';
    const filePattern = '%03d'

    try {
        await createOutputFolderIfNeeded(outputPath);
        await extractFrames(inputPath, outputPath, frameRate, resolution, filePattern);
        res.send('Created Frames successfully.');
    } catch (error) {
        console.error('Error creating frames:', error);
        res.status(500).send('Internal error');
    }
});

router.get('/thumbnails', async (req, res) => {
    const inputPath = 'build/video/video.mov';
    const outputPath = 'build/thumbnails';
    const resolution = '1280x720';
    const filePattern = '%03d'
    try {
        await createOutputFolderIfNeeded(outputPath);
        await extractFrames(inputPath, outputPath, frameRate, resolution, filePattern);
        res.send('Created thumbnails successfully.')
    } catch (error) {
        console.error('Error creating thumbnails:', error);
        res.status(500).send('Internal error');
    }
});
