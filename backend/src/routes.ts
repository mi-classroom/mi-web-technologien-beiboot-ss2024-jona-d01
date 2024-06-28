import express from 'express';
import {extractFrames} from "./services/VideoService.ts";
import {compressFrames} from "./services/ImageService.ts";
import {createDirectory} from "./fileHelper.ts";
import multer from 'multer';
import fs from 'node:fs';
import path from 'path'

export const router = express.Router();
const frameRate = 5;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
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

router.post('/convertImage', async (req, res) => {
    const inputPath = 'build/frames';
    const outputPath = 'build';
    const opacity = 0.05;
    try {
        const images = req.body.images;
        const selectedImageNames: string[] = images
            .filter((image: { selected: boolean; }) => image.selected)
            .map((image: { name: string; }) => image.name);
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
        await createDirectory(outputPath);
        await extractFrames(inputPath, outputPath, frameRate, resolution, filePattern);
        res.send('Created Frames successfully.');
    } catch (error) {
        console.error('Error creating frames:', error);
        res.status(500).send('Internal error');
    }
});

router.put('/thumbnails', async (req, res) => {
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
                console.error('Error creating frames:', error);
                res.status(500).send('Internal error');
            }

            const frames = files.map((file: fs.Dirent, index) => {
                return {
                    index: index + 1,
                    name: file.name,
                    source: path.join('build', 'thumbnails', file.name),
                    selected: true,
                    showPreviewIcon: false,
                    showSkeleton: true
                }
            })

            res.send(frames)
        });
    } catch (error) {
        res.sendStatus(500).send('Internal server error');
    }
})

router.get('/output', async (req, res) => {
    try {
        const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'build', 'output.png'));
        const base64Image = fileBuffer.toString('base64')
        res.send(base64Image)
    } catch (error) {
        res.sendStatus(500).send('Internal server error');
    }
})