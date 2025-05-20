const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');
const podcastTemplatePath = path.join(__dirname, '..', 'public', 'podcast.html');
const podcastOutputPath = path.join(buildDir, 'podcast.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in build directory. Did the build succeed?');
  process.exit(1);
}

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
let podcastTemplate = fs.readFileSync(podcastTemplatePath, 'utf8');

const titleMatch = podcastTemplate.match(/<title>(.*?)<\/title>/);
const descMatch = podcastTemplate.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*>/);

if (titleMatch) {
  indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${titleMatch[1]}</title>`);
}
if (descMatch) {
  indexHtml = indexHtml.replace(/<meta[^>]+name="description"[^>]+content="[^"]*"[^>]*>/, descMatch[0]);
}

fs.writeFileSync(podcastOutputPath, indexHtml);
console.log('podcast.html created in build directory');
