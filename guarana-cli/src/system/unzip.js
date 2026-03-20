import { execSync } from 'child_process';

export function unzip(zipPath, targetDir) {
  execSync(`unzip ${zipPath} -d ${targetDir}`, {
    stdio: 'inherit'
  });
}
