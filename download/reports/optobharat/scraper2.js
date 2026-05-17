const puppeteer = require('/home/z/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/home/z/.cache/puppeteer/chrome/linux-148.0.7778.97/chrome-linux64/chrome';
const OUTPUT_DIR = '/home/z/my-project/download/reports/optobharat';

async function scrape(url, filename, hashRoute) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    const targetUrl = hashRoute ? `${url}#${hashRoute}` : url;
    console.log(`  Navigating to: ${targetUrl}`);
    
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });

    // Extra wait for SPA rendering
    await new Promise(r => setTimeout(r, 3000));

    // Get all content
    const content = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script, style, noscript, svg');
      scripts.forEach(s => s.remove());
      
      const bodyText = document.body.innerText;
      
      const headings = [];
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        headings.push({ tag: h.tagName, text: h.textContent.trim() });
      });

      const links = [];
      document.querySelectorAll('a[href]').forEach(a => {
        links.push({ text: a.textContent.trim().substring(0, 100), href: a.getAttribute('href') });
      });

      const buttons = [];
      document.querySelectorAll('button, a[role="button"], [role="button"]').forEach(b => {
        buttons.push(b.textContent.trim().substring(0, 100));
      });

      const images = [];
      document.querySelectorAll('img').forEach(img => {
        images.push({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' });
      });

      const listItems = [];
      document.querySelectorAll('li').forEach(li => {
        const text = li.textContent.trim();
        if (text.length > 0 && text.length < 200) listItems.push(text);
      });

      const paragraphs = [];
      document.querySelectorAll('p').forEach(p => {
        const text = p.textContent.trim();
        if (text.length > 10) paragraphs.push(text);
      });

      // Get all span text (useful for feature cards)
      const spans = [];
      document.querySelectorAll('span').forEach(s => {
        const text = s.textContent.trim();
        if (text.length > 5 && text.length < 300 && s.children.length === 0) spans.push(text);
      });

      // Get form fields
      const forms = [];
      document.querySelectorAll('input, textarea, select').forEach(f => {
        forms.push({
          type: f.tagName.toLowerCase(),
          name: f.getAttribute('name') || '',
          placeholder: f.getAttribute('placeholder') || '',
          id: f.getAttribute('id') || ''
        });
      });

      return { bodyText, headings, links, buttons, images, listItems, paragraphs, spans, forms, title: document.title, url: window.location.href };
    });

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${filename}.json`),
      JSON.stringify(content, null, 2)
    );
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${filename}_text.txt`),
      content.bodyText
    );

    console.log(`  ✓ ${content.title}`);
    console.log(`    Text: ${content.bodyText.length} chars, Headings: ${content.headings.length}, Links: ${content.links.length}, Buttons: ${content.buttons.length}`);

    return content;
  } finally {
    await browser.close();
  }
}

async function main() {
  // Envision Bharat sub-pages (hash routes)
  console.log('=== ENVISION BHARAT - Products ===');
  const nexpos = await scrape('https://envisionbharat.com', 'envision_nexpos', '/products/nexpos');
  await new Promise(r => setTimeout(r, 2000));
  
  const khaoji = await scrape('https://envisionbharat.com', 'envision_khaoji', '/products/khaoji');
  await new Promise(r => setTimeout(r, 2000));
  
  const optoai = await scrape('https://envisionbharat.com', 'envision_optoai_page', '/products/optoai');
  await new Promise(r => setTimeout(r, 2000));

  // Vision page
  console.log('\n=== ENVISION BHARAT - Vision ===');
  const vision = await scrape('https://envisionbharat.com', 'envision_vision', '/vision');
  await new Promise(r => setTimeout(r, 2000));

  // Contact page  
  console.log('\n=== ENVISION BHARAT - Contact ===');
  const contact = await scrape('https://envisionbharat.com', 'envision_contact', '/contact');

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
