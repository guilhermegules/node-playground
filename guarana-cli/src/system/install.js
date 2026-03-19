import { execSync } from 'child_process';

export function install(dir) {
  execSync('npm install', {
    cwd: dir,
    stdio: 'inherit',
  });
}
