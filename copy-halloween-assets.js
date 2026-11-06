const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const assetsDir = path.join(ROOT, 'assets');
const brainDir = 'C:\\Users\\DELL 7420\\.gemini\\antigravity\\brain\\06069ad5-2116-43d0-b386-66565edc85df';

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const fileMappings = [
  { prefix: 'halloween_hero_banner', target: 'halloween_hero_banner.jpg' },
  { prefix: 'cyber_pumpkin_mascot', target: 'cyber_pumpkin_mascot.jpg' },
  { prefix: 'halloween_website_template_showcase', target: 'halloween_template_showcase.jpg' }
];

try {
  if (fs.existsSync(brainDir)) {
    const brainFiles = fs.readdirSync(brainDir);
    fileMappings.forEach(m => {
      const match = brainFiles.find(f => f.startsWith(m.prefix) && (f.endsWith('.jpg') || f.endsWith('.png')));
      if (match) {
        const src = path.join(brainDir, match);
        const dest = path.join(assetsDir, m.target);
        fs.copyFileSync(src, dest);
        console.log(`[Halloween] Copied ${match} -> assets/${m.target}`);
      }
    });
  }
} catch (e) {
  console.log("[Halloween] Notice copying assets: " + e.message);
}
