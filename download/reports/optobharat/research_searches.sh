#!/bin/bash
# Research script with built-in retry logic
OUTDIR="/home/z/my-project/download/reports/optobharat"

run_search() {
    local search_num=$1
    local query=$2
    local output_file="${OUTDIR}/search_${search_num}.json"
    
    # Wait between searches
    if [ "$search_num" != "01" ]; then
        sleep 15
    fi
    
    local max_retries=5
    local retry=0
    
    while [ $retry -lt $max_retries ]; do
        echo "[$(date +%H:%M:%S)] Search $search_num: $query (attempt $((retry+1)))"
        result=$(z-ai function -n web_search -a "{\"query\": \"$query\", \"num\": 10}" -o "$output_file" 2>&1)
        if echo "$result" | grep -q "DONE\|saved\|results"; then
            echo "[$(date +%H:%M:%S)] Search $search_num: SUCCESS"
            return 0
        elif echo "$result" | grep -q "429"; then
            echo "[$(date +%H:%M:%S)] Search $search_num: Rate limited, waiting 60s..."
            sleep 60
        else
            echo "[$(date +%H:%M:%S)] Search $search_num: Error - $result"
            sleep 30
        fi
        retry=$((retry + 1))
    done
    echo "[$(date +%H:%M:%S)] Search $search_num: FAILED after $max_retries attempts"
    return 1
}

echo "Starting OptoBharat deep research..."
echo "========================================"

run_search "01" "OptoBharat startup AI edtech India review"
run_search "02" "OptoAI AI study tool India review product"
run_search "03" "Envision Bharat startup news India AI education"
run_search "04" "OptoAI vs competitors AI study tools comparison"
run_search "05" "Mrudul Prajapati founder OptoBharat LinkedIn"
run_search "06" "Nishit Patel co-founder OptoBharat OptoAI"
run_search "07" "Sumit Bharodiya co-founder OptoBharat"
run_search "08" "Envision Bharat funding investment startup India"
run_search "09" "Indian AI edtech market trends 2024 2025 2026"
run_search "10" "NexPOS reviews India point of sale software"
run_search "11" "KhaoJi reviews India app restaurant food"
run_search "12" "OptoBharat complaints scam negative feedback"
run_search "13" "OptoAI alternatives Indian AI education tools competitors"
run_search "14" "Envision Bharat Glassdoor employee reviews"
run_search "15" "OptoBharat company registration trademark India CIN"

echo "========================================"
echo "Research complete!"
