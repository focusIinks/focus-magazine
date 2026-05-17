const puppeteer = require('/home/z/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/home/z/.cache/puppeteer/chrome/linux-148.0.7778.97/chrome-linux64/chrome';
const OUTPUT_DIR = '/home/z/my-project/download/reports/optobharat';

async function scrape(url, filename) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Wait for network idle
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });

    // Extra wait for SPA rendering
    await new Promise(r => setTimeout(r, 3000));

    // Get full HTML content
    const html = await page.content();
    
    // Get all text content
    const textContent = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, noscript, svg');
      scripts.forEach(s => s.remove());
      
      const bodyText = document.body.innerText;
      
      // Get all headings
      const headings = [];
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        headings.push({
          tag: h.tagName,
          text: h.textContent.trim()
        });
      });

      // Get all links
      const links = [];
      document.querySelectorAll('a[href]').forEach(a => {
        links.push({
          text: a.textContent.trim().substring(0, 100),
          href: a.getAttribute('href')
        });
      });

      // Get all buttons
      const buttons = [];
      document.querySelectorAll('button, a[role="button"], [role="button"]').forEach(b => {
        buttons.push(b.textContent.trim().substring(0, 100));
      });

      // Get meta description
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // Get page title
      const title = document.title;

      // Get images
      const images = [];
      document.querySelectorAll('img').forEach(img => {
        images.push({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || ''
        });
      });

      // Get list items
      const listItems = [];
      document.querySelectorAll('li').forEach(li => {
        const text = li.textContent.trim();
        if (text.length > 0 && text.length < 200) {
          listItems.push(text);
        }
      });

      // Get all paragraphs
      const paragraphs = [];
      document.querySelectorAll('p').forEach(p => {
        const text = p.textContent.trim();
        if (text.length > 10) {
          paragraphs.push(text);
        }
      });

      return {
        title,
        metaDesc,
        headings,
        links,
        buttons,
        images,
        listItems,
        paragraphs,
        bodyText
      };
    });

    // Save results
    const result = {
      url,
      scrapedAt: new Date().toISOString(),
      htmlSize: html.length,
      ...textContent
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${filename}.json`),
      JSON.stringify(result, null, 2)
    );
    
    // Also save raw text
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${filename}_text.txt`),
      textContent.bodyText
    );

    // Save full HTML
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${filename}_rendered.html`),
      html
    );

    console.log(`✓ Scraped ${url}`);
    console.log(`  Title: ${result.title}`);
    console.log(`  HTML size: ${html.length} bytes`);
    console.log(`  Headings: ${result.headings.length}`);
    console.log(`  Links: ${result.links.length}`);
    console.log(`  Buttons/CTAs: ${result.buttons.length}`);
    console.log(`  Images: ${result.images.length}`);
    console.log(`  List items: ${result.listItems.length}`);
    console.log(`  Paragraphs: ${result.paragraphs.length}`);

    return result;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Starting scrape...\n');

  // Scrape OptoBharat
  console.log('=== OPTOBHARAT ===');
  const opto = await scrape('https://optobharat.com', 'optobharat_rendered');
  
  // Wait between requests
  await new Promise(r => setTimeout(r, 2000));

  // Scrape Envision Bharat  
  console.log('\n=== ENVISION BHARAT ===');
  const env = await scrape('https://envisionbharat.com', 'envisionbharat_rendered');

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
