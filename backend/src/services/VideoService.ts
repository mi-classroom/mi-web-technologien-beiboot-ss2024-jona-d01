import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(<string>ffmpegStatic);

export async function trimVideo(inputPath: string, outputPath: string, startTime: number, endTime: number) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(outputPath)
      .on('end', () => {
        console.log('Video trimmed successfully.');
        resolve();
      })
      .on('error', (err: Error) => {
        console.error('Error trimming video:', err);
        reject(err);
      })
      .run()
  });
}

export async function extractFrames(inputPath: string, outputPath: string, frameRate: number, resolution: string, filePattern: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg()
            .size(resolution)
            .input(inputPath)
            .fps(frameRate)
            .saveToFile(`${outputPath}/${filePattern}.png`)
            .on('end', () => {
                console.log('Frames extracted successfully.');
                resolve();
            })
            .on('error', (error: Error) => {
                console.error('Error extracting frames:', error);
                reject(error);
            })
    });
}