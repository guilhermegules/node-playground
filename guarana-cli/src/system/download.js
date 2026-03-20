import https from 'https';
import http from 'http';
import fs from 'fs';

export function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        downloadRedirectHandler(
          redirects,
          () => reject(new Error('Too many redirects')),
          () => resolve(download(res.headers.location, dest, redirects + 1)),
        );
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    });

    request.on('error', reject);
  });
}

function downloadRedirectHandler(redirects, onError, onSuccess) {
  if (redirects > 5) {
    onError()
    return;
  }

  return onSuccess();
}
