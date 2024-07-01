import fs from 'fs'
import sharp, { OverlayOptions } from 'sharp'
import path from 'path'
import { Image } from '@shared-types'

export async function compressFrames(inputPath: string, outputPath: string, images: Image[]) {
  try {
    const files = await fs.promises.readdir(inputPath, { withFileTypes: true })

    const compositeImages: OverlayOptions[] = await Promise.all(
      files.map(async file => {
        const image = images.find((image: Image) => image.name === file.name)
        const imagePath = path.join(inputPath, file.name)
        try {
          const imageBuffer = await sharp(imagePath)
            .ensureAlpha(image?.opacity ? (image.opacity / 100) : 0)
            .toBuffer()
          return { input: imageBuffer }
        } catch (error) {
          console.error('Error caused by sharp', error)
          throw error
        }
      })
    )

    const sourceImage = await sharp(`${inputPath}/${images[0].name}`)
      .ensureAlpha(images[0].opacity ? (images[0].opacity / 100) : 0)
      .toBuffer()

    await sharp(sourceImage)
      .composite(compositeImages)
      .toFile(`${outputPath}/output.png`)

    console.log('Created image: output.png')
  } catch (error) {
    console.error('Internal error:', error)
    throw error
  }
}