---
name: instagram-search
description: >
  Search Instagram for profiles, posts, hashtags, reels, and trending content, then generate a comprehensive
  PDF report with all findings. Activate this skill whenever the user asks to search Instagram, look up an
  Instagram user/profile, find Instagram posts by hashtag, research Instagram accounts, analyze Instagram
  engagement, find trending Instagram content, get Instagram profile info, search for Instagram reels, or
  wants any Instagram-related research compiled into a report. Also trigger when the user mentions "insta",
  "IG", or "instagram" together with words like search, find, lookup, research, info, profile, hashtag,
  posts, reels, explore, or analyze — even if they don't explicitly ask for a PDF.
compatibility: web_search, web_reader, pdf
---

# Instagram Search & PDF Report Generator

This skill searches Instagram for publicly available information using web search and web scraping,
then compiles all findings into a professional PDF report.

## How It Works

Instagram does not offer a free public API for search. This skill works around that by combining
multiple data sources to gather the richest possible information:

1. **Web search** — queries search engines with targeted Instagram-specific operators to discover
   profiles, posts, hashtags, and public pages.
2. **Web reader** — scrapes publicly accessible Instagram pages and third-party analytics sites
   (like Picuki, InstaNavigation, ImgInn, etc.) to extract profile details, post metadata,
   follower counts, bio info, and recent post previews.
3. **PDF generation** — compiles everything into a polished PDF report using the `pdf` skill.

## Workflow

### Step 1: Determine the Search Type

Parse the user's request to identify what they want to find. The main search types are:

| Search Type | Trigger Keywords | What to Search |
|---|---|---|
| **Profile lookup** | username, profile, account, user, "who is @..." | A specific Instagram user's public profile info |
| **Hashtag search** | hashtag, #tag, topic, trending topic | Posts and engagement data for a hashtag |
| **Content search** | posts about, reels, photos about, videos about | Content related to a specific topic on Instagram |
| **Competitor analysis** | competitor, compare, vs, similar accounts | Multiple profiles compared side by side |
| **Trending** | trending, popular, viral, top instagram | Currently trending content, hashtags, or accounts |

If the user's request is ambiguous, ask them to clarify. Otherwise proceed with the best match.

### Step 2: Execute Web Searches

Run multiple targeted web searches to maximize data coverage. Use the `web_search` tool with
these query patterns (adapt the queries to the user's specific search):

**For profile lookups:**
- `"@[username] instagram profile" site:instagram.com`
- `"[username] instagram bio followers posts"`
- `"[real name if known] instagram account"`

**For hashtag searches:**
- `"#[hashtag] instagram posts trending"`
- `"instagram #[hashtag] engagement statistics"`
- `"top #[hashtag] instagram posts 2025 2026"`

**For content/topic searches:**
- `"instagram [topic] best posts"`
- `"instagram [topic] influencers accounts"`
- `"instagram [topic] trending reels"`

**For competitor analysis:**
- Run profile lookups for each account separately
- Add comparison queries like `"[account1] vs [account2] instagram followers"`

**For trending:**
- `"instagram trending hashtags [current month/year]"`
- `"instagram trending reels right now"`
- `"instagram viral content [niche/topic]"`

Run at least 3-5 different search queries per search to ensure comprehensive coverage.

### Step 3: Scrape Detailed Information

After web search returns URLs, use the `web_reader` tool to extract content from the most relevant
results. Focus on:

- **Instagram profile pages** — bio, follower/following count, post count, highlights
- **Analytics/third-party sites** — engagement rates, top posts, audience demographics
- **Blog posts or articles** — summaries, rankings, or reviews of Instagram accounts
- **News articles** — recent mentions or viral moments

For each source, extract:
- Profile URLs
- Display name and username
- Bio/description
- Follower count, following count, post count
- Engagement rate (if available)
- Notable/recent posts (dates, likes, comments counts)
- Profile picture URL (if available)
- Whether the account is verified
- Any other publicly available metrics

### Step 4: Organize the Data

Structure all collected data into a clear hierarchy. Create a data summary in memory before
proceeding to PDF generation:

```
Search Query: [what the user asked for]
Date of Report: [current date]
Data Sources: [list of URLs scraped]

Results:
  ├── Profile 1
  │   ├── Username, Display Name, URL
  │   ├── Bio
  │   ├── Followers / Following / Posts
  │   ├── Engagement Rate
  │   ├── Verification Status
  │   ├── Top Posts (list with metrics)
  │   └── Notes
  ├── Profile 2
  │   └── ...
  ├── Hashtag Data
  │   ├── Total posts
  │   ├── Average engagement
  │   └── Top posts
  └── Summary / Key Findings
```

### Step 5: Generate the PDF Report

Use the `pdf` skill to create a professional PDF report. Invoke it by calling `Skill(command="pdf")`
and following its instructions. The report should contain:

**Cover Page:**
- Title: "Instagram Search Report"
- Subtitle: The search query/topic
- Date of generation

**Table of Contents** (auto-generated)

**Section 1: Search Overview**
- What was searched for
- Search parameters and queries used
- Date and time of the search

**Section 2: Profile Results** (for each profile found)
- Profile header with username and display name
- Profile URL
- Bio text
- Key metrics table (followers, following, posts, engagement rate)
- Verification status
- Notable recent posts with engagement metrics
- Brief analysis of the account's content theme

**Section 3: Hashtag Results** (if applicable)
- Hashtag name and total post count
- Average engagement metrics
- Top posts under this hashtag
- Trend analysis (growing/declining)

**Section 4: Content Analysis** (if applicable)
- Summary of content found for the topic
- Top posts with metrics
- Influencer accounts found
- Content themes and patterns

**Section 5: Key Findings & Summary**
- Executive summary of all findings
- Notable metrics and highlights
- Recommendations (if the user is doing competitive or market research)

**Appendix**
- List of all data sources with URLs
- Search queries used
- Disclaimer about data accuracy (publicly available data, may not be real-time)

### PDF Formatting Guidelines

- Use a clean, modern layout with consistent typography
- Use Instagram's brand color (#E1306C) as an accent color for headings and highlights
- Include tables for metrics data
- Use bullet points for lists of posts or accounts
- Keep the report well-organized with clear section breaks
- Save the PDF to `/home/z/my-project/download/` with a descriptive filename like
  `instagram-search-[query]-[date].pdf`

## Important Notes

- Instagram data is **real-time and constantly changing**. The report represents a snapshot
  at the time of search and may not reflect current numbers.
- Some Instagram pages may block scraping or require login. If this happens, rely more heavily
  on third-party analytics sites and search engine caches.
- Respect privacy — only collect publicly available information. Do not attempt to access
  private accounts or bypass login requirements.
- If a search returns no results, suggest alternative search terms or broader queries.
- Always inform the user if data was limited or partially unavailable.

## Error Handling

- **No results found**: Suggest broader search terms or alternative keywords
- **Scraping blocked**: Fall back to search engine snippets and third-party sites
- **Incomplete data**: Clearly note in the report which fields could not be retrieved
- **Timeout**: If web search or reading takes too long, proceed with available data and note limitations
