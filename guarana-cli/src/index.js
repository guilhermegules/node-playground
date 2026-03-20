import path from 'path';
import fs from "fs";

import { ask } from './prompt/ask.js';
import { parseArgs } from './utils.js';
import { copyDir } from './fs/copy.js';
import { updatePackageJson } from './fs/json.js';
import { install } from './system/install.js';
import { templates } from './templates/registry.js';
import { download } from './system/download.js';
import { unzip } from './system/unzip.js';
import { moveContents } from './fs/move.js';

export async function createApp(args) {
  let { projectName, template } = parseArgs(args);

  if (!projectName) {
    projectName = await ask('Project name: ');
  }

  if (!template) {
    template = await ask(`Template ${Object.keys(templates).join(",")}: `);
  }

  console.log('\n✅ Done!');
  console.log(`cd ${projectName}`);
  console.log('npm run dev');

  const templateRepository = templates[template];

  if (!templateRepository) {
    console.error('❌ Template not found, installing the default template');
    const targetDir = path.resolve(process.cwd(), projectName);
    const templateDir = path.resolve('templates', template);

    copyDir(templateDir, targetDir);
    updatePackageJson(targetDir, projectName);

    const shouldInstall = await ask('Install dependencies? (Y/n): ');
    if (shouldInstall === 'y' || shouldInstall === '') {
      install(targetDir);
    }
    return;
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  const tempZip = path.join(process.cwd(), `${projectName}.zip`);
  const tempExtract = path.join(process.cwd(), `${projectName}-temp`);

  fs.mkdirSync(targetDir, { recursive: true });

  console.log('⬇️  Downloading template...');
  await download(templateRepository.url, tempZip);

  console.log('📦 Extracting...');
  unzip(tempZip, tempExtract);

  const extractedFolder = fs.readdirSync(tempExtract)[0];
  const extractedPath = path.join(tempExtract, extractedFolder);

  moveContents(extractedPath, targetDir);

  fs.rmSync(tempZip);
  fs.rmSync(tempExtract, { recursive: true, force: true });

  console.log('✅ Project ready!');
}
