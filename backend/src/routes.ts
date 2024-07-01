import express from 'express';
import {extractFrames} from "./services/VideoService.ts";
import {compressFrames} from "./services/ImageService.ts";
import { createDirectory, deleteFiles } from './fileHelper.ts'
import multer from 'multer';
import fs from 'node:fs';
import path from 'path'
import type { Image } from '@shared-types'

export const router = express.Router();
const frameRate = 5;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await createDirectory('build');
        await createDirectory('build/video');
        cb(null, 'build/video');
    },
    filename: (req, file, cb) => {
        cb(null, 'video.mov');
    },
});
const uploadVideo = multer({ storage });

router.post('/upload', uploadVideo.single('video'), (req, res) => {
    res.sendStatus(200);
})

router.post('/frames', async (req, res) => {
    const inputPath = 'build/video/video.mov';
    const outputPath = 'build/frames';
    const resolution = '1920x1080';
    const filePattern = '%03d'

    try {
        await createDirectory(outputPath);
        await extractFrames(inputPath, outputPath, frameRate, resolution, filePattern);
        res.send('Created Frames successfully.');
    } catch (error) {
        console.error('Error creating frames:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/thumbnails', async (req, res) => {
    const inputPath = 'build/video/video.mov';
    const outputPath = 'build/thumbnails';
    const resolution = '1280x720';
    const filePattern = '%03d'
    try {
        await createDirectory(outputPath);
        await extractFrames(inputPath, outputPath, frameRate, resolution, filePattern);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error creating thumbnails:', error);
        res.status(500).send('Internal server error');
    }
});


router.get('/thumbnails', async (req, res) => {
    try {
        fs.readdir(path.join(process.cwd(), 'build', 'thumbnails'), { withFileTypes: true },(error, files: fs.Dirent[]) => {
            if (error) {
                console.error('Error reading directory', error);
                res.status(500).send('Internal error');
            }

            const frames: Image[] = files.map((file: fs.Dirent, index: number): Image => {
                return {
                    index: index + 1,
                    name: file.name,
                    source: path.join('build', 'thumbnails', file.name),
                    selected: true,
                    showPreviewIcon: false,
                    showSkeleton: true,
                    opacity: 5
                }
            })

            res.send(frames)
        });
    } catch (error) {
        res.sendStatus(500).send('Internal server error');
    }
})

router.put('/filterImages', async (req, res) => {
    try {
        const images: Image[] = req.body.images;
        const nonSelectedImages: Image[] = images.filter(image => !image.selected);
        await deleteFiles(path.join(process.cwd(), 'build', 'thumbnails'), nonSelectedImages);
        await deleteFiles(path.join(process.cwd(), 'build', 'frames'), nonSelectedImages);
        res.send('Filtered images successfully.');
    } catch (error) {
        console.error('Error filtering images:', error);
        res.status(500).send('Internal server error');
    }
})

router.post('/output', async (req, res) => {
    const inputPath = 'build/frames';
    const outputPath = 'build';
    try {
        const images: Image[] = req.body.images;
        await compressFrames(inputPath, outputPath, images);
        res.send('Created Picture successfully.');
    } catch (error) {
        console.error('Error creating output:', error);
        res.status(500).send('Internal error');
    }
});

router.get('/output', async (req, res) => {
    try {
        const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'build', 'output.png'));
        const base64Image = fileBuffer.toString('base64')
        res.send(base64Image)
    } catch (error) {
        res.sendStatus(500).send('Internal server error');
    }
})