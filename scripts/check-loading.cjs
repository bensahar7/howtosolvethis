const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Block the earth background entirely → this is the worst-case "not loaded"
  // state. If the fallback is black (not grey), the fix works.
  let matched = 0;
  await page.route('**/earth-hero.png', async (route) => {
    matched++;
    await route.abort();
  });

  await page.goto('http://localhost:3000', { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(1500);

  const colors = await page.evaluate(() => ({
    bodyBg: getComputedStyle(document.body).backgroundColor,
    // The fixed bg div is the first child stack; read its computed bg color.
    bgDiv: (() => {
      const d = document.querySelector('div.fixed.inset-0');
      return d ? getComputedStyle(d).backgroundColor : 'not-found';
    })(),
  }));

  await page.screenshot({ path: 'outputs/no-bg-image.png' });
  console.log('earth-hero.png requests intercepted:', matched);
  console.log(JSON.stringify(colors, null, 2));
  await browser.close();
})();
