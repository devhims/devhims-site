import { list, put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

import { config } from 'dotenv';

config({ path: '.env.local' });

type BlobMapping = {
  path: string;
  url: string;
};

type BlobUrlMap = {
  [key: string]: string | BlobUrlMap;
};

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(res) : [res];
    })
  );
  return files.flat();
}

async function syncBlobStorage() {
  try {
    const PROJECT_ROOT = process.env.BLOB_STORAGE_ROOT;

    // 1. Get all image files from public directory
    const publicDir = path.join(process.cwd(), 'public');
    const allFiles = await getAllFiles(publicDir);
    const imageFiles = allFiles.filter((file) =>
      file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    // 2. Get existing blobs
    const { blobs } = await list();
    const existingPaths = new Set(blobs.map((blob) => blob.pathname));

    // 3. Upload missing files and collect URLs
    const blobMappings: BlobMapping[] = [];

    for (const filePath of imageFiles) {
      // Convert absolute path to relative path from public directory
      const relativePath = path.relative(publicDir, filePath);
      // Add project root to path
      const blobPath = `${PROJECT_ROOT}/${relativePath}`;

      if (!existingPaths.has(blobPath)) {
        console.log(`Uploading ${relativePath} to blob storage...`);
        const fileContent = await fs.readFile(filePath);
        const blob = await put(blobPath, fileContent, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        blobMappings.push({ path: relativePath, url: blob.url });
      } else {
        const existingBlob = blobs.find((blob) => blob.pathname === blobPath);
        if (existingBlob) {
          blobMappings.push({ path: relativePath, url: existingBlob.url });
        }
      }
    }

    // 4. Generate URL mapping file
    const outputDir = path.join(process.cwd(), 'src/_generated');
    await fs.mkdir(outputDir, { recursive: true });

    const urlMap = blobMappings.reduce((acc, { path: filePath, url }) => {
      const parts = filePath.split('/');
      let current = acc as BlobUrlMap;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i].toUpperCase();
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part] as BlobUrlMap;
      }

      const fileName = parts[parts.length - 1];
      const key = fileName.split('.')[0].toUpperCase();
      current[key] = url;

      return acc;
    }, {} as BlobUrlMap);

    await fs.writeFile(
      path.join(outputDir, 'blob-urls.json'),
      JSON.stringify(urlMap, null, 2)
    );

    // 5. Remove images from public folder
    for (const file of imageFiles) {
      await fs.unlink(file);
    }

    console.log('✅ Blob storage sync completed successfully');
    console.log(`📝 URL mapping saved to src/_generated/blob-urls.json`);
    console.log(`🗑️  Removed ${imageFiles.length} files from public folder`);
  } catch (error) {
    console.error('Error syncing blob storage:', error);
    process.exit(1);
  }
}

syncBlobStorage().catch(console.error);
