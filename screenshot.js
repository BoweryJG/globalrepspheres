const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('https://repspheres.com', { waitUntil: 'networkidle2' });
  
  // Wait for page to load
  await new Promise(r => setTimeout(r, 3000));
  
  // Click the chatbot launcher to open it
  try {
    await page.click('button[aria-label="chat"]');
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    console.log('Could not find chatbot button');
  }
  
  await page.screenshot({ path: 'chatbot-current.png' });
  console.log('Screenshot saved as chatbot-current.png');
  
  await browser.close();
})();