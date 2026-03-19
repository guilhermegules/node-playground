import fs from 'fs';
import path from 'path';

export function updatePackageJson(dir, name) {
  const file = path.join(dir, 'package.json');

  if (!fs.existsSync(file)) return;

  const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'));
  pkg.name = name;

  fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
}
