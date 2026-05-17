import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ZAI = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk/dist/index.js').default;
const fs = require('fs');
const path = require('path');

const queries = [
  { id: "01", q: "OptoBharat startup AI edtech India review" },
  { id: "02", q: "OptoAI AI study tool India review product" },
  { id: "03", q: "Envision Bharat startup news India AI education" },
  { id: "04", q: "OptoAI vs competitors AI study tools comparison" },
  { id: "05", q: "Mrudul Prajapati founder OptoBharat LinkedIn" },
  { id: "06", q: "Nishit Patel co-founder OptoBharat OptoAI" },
  { id: "07", q: "Sumit Bharodiya co-founder OptoBharat" },
  { id: "08", q: "Envision Bharat funding investment startup India" },
  { id: "09", q: "Indian AI edtech market trends 2024 2025 2026" },
  { id: "10", q: "NexPOS reviews India point of sale software" },
  { id: "11", q: "KhaoJi reviews India app restaurant food" },
  { id: "12", q: "OptoBharat complaints scam negative feedback" },
  { id: "13", q: "OptoAI alternatives Indian AI education tools competitors" },
  { id: "14", q: "Envision Bharat Glassdoor employee reviews" },
  { id: "15", q: "OptoBharat company registration trademark India CIN" },
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const zai = await ZAI.create();
  const outDir = "/home/z/my-project/download/reports/optobharat";
  
  for (const { id, q } of queries) {
    let success = false;
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        const ts = new Date().toISOString();
        console.log(`[${ts}] Search ${id}: "${q}" (attempt ${attempt + 1})`);
        const results = await zai.functions.invoke('web_search', { query: q, num: 10 });
        
        fs.writeFileSync(path.join(outDir, `search_${id}.json`), JSON.stringify(results, null, 2));
        console.log(`[${new Date().toISOString()}] Search ${id}: SUCCESS (${results.length} results)`);
        success = true;
        break;
      } catch (err) {
        const msg = err.message || String(err);
        console.log(`[${new Date().toISOString()}] Search ${id}: FAILED - ${msg.substring(0, 120)}`);
        if (msg.includes('429')) {
          const waitTime = 30000 + attempt * 15000;
          console.log(`  Waiting ${Math.round(waitTime / 1000)}s before retry...`);
          await sleep(waitTime);
        } else {
          await sleep(10000);
        }
      }
    }
    if (!success) {
      console.log(`[${new Date().toISOString()}] Search ${id}: PERMANENTLY FAILED`);
      fs.writeFileSync(path.join(outDir, `search_${id}.json`), JSON.stringify({ error: "Failed after all retries" }));
    }
    await sleep(3000);
  }
  console.log("\n=== ALL SEARCHES COMPLETE ===");
}

run().catch(console.error);
