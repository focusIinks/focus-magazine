import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ZAI = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk/dist/index.js').default;

const queries = [
  "optobharat.com review",
  "OptoAI study assistant review",
  "Envision Bharat startup",
  "envisionbharat.com",
  "Mrudul Prajapati envision bharat",
  "Nishit Patel envision bharat",
  "optobharat reddit",
  "optobharat quora",
  "nexpos.app review",
  "optoai vs other study tools",
  "Sumit Bharodiya envision bharat",
  "optobharat scam OR fraud OR complaint",
  "OptoBharat AI education India",
  "optobharat linkedin",
  "envison bharat optobharat funding"
];

async function main() {
  console.log("Initializing SDK...");
  const zai = await ZAI.create();
  console.log("SDK initialized. Waiting 90s for rate limit to clear...");
  await new Promise(resolve => setTimeout(resolve, 90000));
  console.log("Starting searches...");

  const allResults = {};
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    console.log(`\n[${i+1}/${queries.length}] Searching: "${query}"`);
    
    let retries = 3;
    let success = false;
    
    while (retries > 0 && !success) {
      try {
        const results = await zai.functions.invoke('web_search', {
          query: query,
          num: 10
        });
        
        allResults[query] = results;
        successCount++;
        success = true;
        console.log(`  -> Got ${results.length} results`);
        
        for (const r of results) {
          console.log(`     [${r.host_name}] ${r.name.substring(0, 80)}`);
        }
      } catch (error) {
        retries--;
        console.log(`  -> ERROR (retries left: ${retries}): ${error.message.substring(0, 100)}`);
        if (retries > 0) {
          const waitTime = 30 * (4 - retries);
          console.log(`  Waiting ${waitTime}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          failCount++;
          allResults[query] = { error: error.message };
        }
      }
    }

    // Wait 8 seconds between requests
    if (i < queries.length - 1) {
      console.log("  Waiting 8s before next search...");
      await new Promise(resolve => setTimeout(resolve, 8000));
    }
  }

  // Save all results to file
  const output = JSON.stringify(allResults, null, 2);
  const fs = await import('fs');
  fs.writeFileSync('/home/z/my-project/download/optobharat/all_search_results.json', output);
  console.log(`\n✅ All results saved to all_search_results.json`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
