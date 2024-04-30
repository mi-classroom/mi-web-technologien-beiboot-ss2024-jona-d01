import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(<string>ffmpegStatic);

export async function extractFrames(inputPath: string, outputPath: string, frameRate: number) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg()
            .input(inputPath)
            .fps(frameRate)
            .saveToFile(`${outputPath}/frame-%03d.png`)
            .on('progress', (progress: any) => {
                if (progress.percent) {
                    console.log(`Verarbeitung: ${Math.floor(progress.percent)}% abgeschlossen`);
                }
            })
            .on('end', () => {
                console.log('FFmpeg hat die Verarbeitung abgeschlossen.');
                resolve();
            })
            .on('error', (error: Error) => {
                console.error(error);
                reject(error);
            });
    });
}