#!/usr/bin/env python3
"""Extract Bing search results from HTML files."""
import re
import os
import sys

def extract_bing_results(filepath):
    """Extract titles, URLs, and snippets from Bing HTML."""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    results = []
    
    # Split by b_algo blocks
    blocks = re.split(r'<li class="b_algo"', html)
    
    for block in blocks[1:]:  # Skip first split (before first result)
        result = {}
        
        # Extract URL
        url_match = re.search(r'href="(https?://(?!bing\.com|microsoft\.com|msn\.com|live\.com|cc\.bingj\.com)[^"]+)"', block)
        if url_match:
            result['url'] = url_match.group(1)
        
        # Extract title
        title_match = re.search(r'<h2[^>]*><a[^>]*>(.*?)</a></h2>', block, re.DOTALL)
        if title_match:
            result['title'] = re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
        
        # Extract snippet
        snippet_match = re.search(r'<p[^>]*>(.*?)</p>', block, re.DOTALL)
        if snippet_match:
            result['snippet'] = re.sub(r'<[^>]+>', '', snippet_match.group(1)).strip()
        
        if result.get('url') or result.get('title'):
            results.append(result)
    
    return results

def main():
    base_dir = '/home/z/my-project/download/optobharat'
    
    queries = {
        'bing_1.html': 'optobharat review',
        'bing_2.html': 'Mrudul Prajapati Envision Bharat',
        'bing_3.html': 'Envision Bharat startup AI education',
        'bing_4.html': 'OptoAI study assistant handwritten notes',
        'bing_5.html': 'nexpos.app OR nexpos',
        'bing_6.html': 'optobharat scam OR fraud OR complaint OR fake',
    }
    
    all_results = {}
    
    for filename, query in queries.items():
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            results = extract_bing_results(filepath)
            all_results[query] = results
            print(f"\n{'='*80}")
            print(f"QUERY: {query}")
            print(f"FILE: {filename}")
            print(f"RESULTS: {len(results)}")
            print(f"{'='*80}")
            for i, r in enumerate(results, 1):
                print(f"\n[{i}] {r.get('title', 'NO TITLE')}")
                print(f"    URL: {r.get('url', 'NO URL')}")
                print(f"    Snippet: {r.get('snippet', 'NO SNIPPET')[:200]}")
        else:
            print(f"File not found: {filepath}")
    
    # Save to JSON
    import json
    with open(os.path.join(base_dir, 'bing_search_results.json'), 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\n\nResults saved to bing_search_results.json")

if __name__ == '__main__':
    main()
