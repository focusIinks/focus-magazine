const { createRequire } = require('module');
const require = createRequire(__filename);
const fs = require('fs');
const path = require('path');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    let ZAI;
    try {
        const mod = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk/dist/index.js');
        ZAI = mod.default || mod;
    } catch(e) {
        console.log("SDK load error:", e.message);
        return;
    }
    
    const zai = await ZAI.create();
    const outDir = "/home/z/my-project/download/reports/optobharat";
    
    const queries = [
        { id: "01", q: "OptoBharat startup AI edtech India review" },
        { id: "02", q: "OptoAI AI study tool India review product" },
        { id: "03", q: "Envision Bharat startup news India" },
        { id: "04", q: "OptoAI vs competitors AI study tools" },
        { id: "05", q: "Mrudul Prajapati founder OptoBharat" },
        { id: "06", q: "Nishit Patel co-founder OptoBharat OptoAI" },
        { id: "07", q: "Sumit Bharodiya co-founder OptoBharat" },
        { id: "08", q: "Envision Bharat funding investment startup" },
        { id: "09", q: "Indian AI edtech market trends 2024 2025 2026" },
        { id: "10", q: "NexPOS reviews India point of sale" },
        { id: "11", q: "KhaoJi restaurant management app India" },
        { id: "12", q: "OptoBharat complaints scam negative" },
        { id: "13", q: "OptoAI alternatives Indian AI education tools" },
        { id: "14", q: "Envision Bharat Glassdoor employee reviews" },
        { id: "15", q: "OptoBharat company registration trademark India" },
    ];
    
    for (const { id, q } of queries) {
        let ok = false;
        for (let i = 0; i < 12; i++) {
            try {
                console.log(`[${new Date().toISOString()}] S${id}: "${q}" (try ${i+1})`);
                const r = await zai.functions.invoke('web_search', { query: q, num: 10 });
                fs.writeFileSync(path.join(outDir, `search_${id}.json`), JSON.stringify(r, null, 2));
                console.log(`[${new Date().toISOString()}] S${id}: OK (${r.length} results)`);
                ok = true;
                break;
            } catch(e) {
                const m = (e.message || '').substring(0, 100);
                console.log(`[${new Date().toISOString()}] S${id}: ERR ${m}`);
                if (m.includes('429')) {
                    await sleep(60000);
                } else {
                    await sleep(15000);
                }
            }
        }
        if (!ok) {
            fs.writeFileSync(path.join(outDir, `search_${id}.json`), '{"error":"failed"}');
            console.log(`[${new Date().toISOString()}] S${id}: DEAD`);
        }
        await sleep(5000);
    }
    console.log("ALL DONE");
}

main().catch(console.error);
