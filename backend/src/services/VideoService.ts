import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(<string>ffmpegStatic);

export async function extractFrames(inputPath: string, outputPath: string, frameRate: number, resolution: string, filePattern: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg()
            .size(resolution)
            .input(inputPath)
            .fps(frameRate)
            .saveToFile(`${outputPath}/${filePattern}.png`)
            .on('end', () => {
                console.log('FFmpeg conversion successfully.');
                resolve();
            })
            .on('FFmpeg error', (error: Error) => {
                console.error(error);
                reject(error);
            });
    });
}