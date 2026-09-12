import sharp from 'sharp';

// 1200x630 Messenger/Facebook link preview in the portfolio's ink & paper brand.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF7F2"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#221D18" stroke-opacity="0.16" stroke-width="2"/>
  <rect x="96" y="150" width="72" height="8" fill="#C2410C"/>
  <text x="96" y="230" font-family="'Courier New', Courier, monospace" font-size="30" letter-spacing="3" fill="#8B847A">~ $ whoami</text>
  <text x="90" y="360" font-family="Georgia, 'Times New Roman', serif" font-size="120" fill="#221D18">Elvin <tspan font-style="italic" fill="#C2410C">Ramos</tspan></text>
  <text x="96" y="440" font-family="'Courier New', Courier, monospace" font-size="34" fill="#57514A">&gt; web developer — laravel · react · mysql</text>
  <text x="96" y="540" font-family="'Courier New', Courier, monospace" font-size="28" fill="#8B847A">elvinramos.netlify.app</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/images/og-cover.png');
console.log('og-cover.png written');
