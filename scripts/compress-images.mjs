import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { renameSync } from 'fs';
import path from 'path';

const dir = 'public/images';
const MAX_WIDTH = 1600;

const files = await readdir(dir);
const targets = ['Snake.jpg', 'project2.jpg', 'elvin.jpg', 'cert5.png', 'cert6.png'];

for (const file of targets) {
  const filePath = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const tmpPath = filePath + '.tmp';
  const pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  let buffer;
  if (ext === '.jpg' || ext === '.jpeg') {
    buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  } else if (ext === '.png') {
    buffer = await pipeline.png({ compressionLevel: 9, quality: 85 }).toBuffer();
  }

  if (!buffer || buffer.length >= (await sharp(filePath).toBuffer()).length) {
    console.log(`${file}: skipped`);
    continue;
  }

  await sharp(buffer).toFile(tmpPath);
  renameSync(tmpPath, filePath);
  console.log(`${file}: ${(buffer.length / 1024).toFixed(0)} KB`);
}
