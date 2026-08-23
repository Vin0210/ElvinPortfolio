import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { renameSync } from 'fs';
import path from 'path';

const dir = 'public/images';
const MAX_WIDTH = 1600;

const files = await readdir(dir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const filePath = path.join(dir, file);

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const originalSize = (await stat(filePath)).size;
  const meta = await sharp(filePath).metadata();
  const pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  let buffer;
  let outFile = filePath;

  if (ext === '.png') {
    // WebP decodes ~3x faster and is far smaller than PNG for UI screenshots
    buffer = await pipeline.webp({ quality: 82 }).toBuffer();
    outFile = filePath.replace(/\.png$/i, '.webp');
  } else {
    buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  }

  if (buffer.length >= originalSize && meta.width <= MAX_WIDTH) {
    console.log(`${file}: skipped (already optimized)`);
    continue;
  }

  // Write to temp then swap — avoids in-place write conflicts on Windows
  const tmpPath = outFile + '.tmp';
  await sharp(buffer).toFile(tmpPath);
  renameSync(tmpPath, outFile);
  if (outFile !== filePath) await unlink(filePath);

  const saved = ((1 - buffer.length / originalSize) * 100).toFixed(0);
  console.log(`${file} -> ${path.basename(outFile)}: ${(buffer.length / 1024).toFixed(0)} KB (-${saved}%)`);
}

