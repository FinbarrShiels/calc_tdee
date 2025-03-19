const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    const sizes = [16, 32, 48];
    const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'));
    
    // Create a buffer for each size
    const promises = sizes.map(async (size) => {
      return await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
    });
    
    const buffers = await Promise.all(promises);
    
    // Convert to ICO using sharp (workaround)
    const ico = Buffer.concat([
      // ICO header
      Buffer.from([0, 0, 1, 0, sizes.length, 0]),
      
      // Image directory entries
      ...sizes.flatMap((size, i) => {
        const offset = 6 + (16 * sizes.length) + buffers.slice(0, i).reduce((sum, buf) => sum + buf.length, 0);
        return [
          Buffer.from([size, 0, 0, 0, 1, 0, 32, 0]),
          Buffer.from(new Uint32Array([buffers[i].length]).buffer),
          Buffer.from(new Uint32Array([offset]).buffer)
        ];
      }),
      
      // Image data
      ...buffers
    ]);
    
    fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), ico);
    console.log('favicon.ico generated successfully!');
  } catch (err) {
    console.error('Error generating favicon:', err);
  }
}

generateFavicon(); 