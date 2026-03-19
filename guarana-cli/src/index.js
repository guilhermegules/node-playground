import path from 'path';

import { ask } from './prompt/ask.js';
import { parseArgs } from './utils.js';
import { copyDir } from './fs/copy.js';
import { updatePackageJson } from './fs/json.js';
import { install } from './system/install.js';

export async function createApp(args) {
  let { projectName, template } = parseArgs(args);

  if (!projectName) {
    projectName = await ask('Project name: ');
  }

  if (!template) {
    template = await ask('Template (vanilla/node): ');
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve('templates', template);

  copyDir(templateDir, targetDir);
  updatePackageJson(targetDir, projectName);

  const shouldInstall = await ask('Install dependencies? (Y/n): ');
  if (shouldInstall === 'y' || shouldInstall === '') {
    install(targetDir);
  }

  console.log('\n✅ Done!');
  console.log(`cd ${projectName}`);
  console.log('npm run dev');
}
