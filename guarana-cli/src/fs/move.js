import fs from 'fs';
import path from 'path';

export function moveContents(srcDir, destDir) {
  const items = fs.readdirSync(srcDir);

  for (const item of items) {
    const src = path.join(srcDir, item);
    const dest = path.join(destDir, item);

    fs.renameSync(src, dest);
  }
}
