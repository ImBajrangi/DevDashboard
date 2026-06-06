# Graph Report - DevDashboard  (2026-06-06)

## Corpus Check
- 56 files · ~36,879 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 179 nodes · 211 edges · 28 communities (13 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `357096df`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `useMobile()` - 19 edges
2. `DevDashboard (The Nexus)` - 6 edges
3. `The Nexus` - 5 edges
4. `App()` - 3 edges
5. `Layout()` - 3 edges
6. `TheDossier()` - 3 edges
7. `TheFeed()` - 3 edges
8. `TheNexus()` - 3 edges
9. `cache` - 3 edges
10. `supabase` - 3 edges

## Surprising Connections (you probably didn't know these)
- `The Nexus` --references--> `Custom Caching Engine`  [EXTRACTED]
  README.md → src/lib/cache.js
- `Main Entry Point` --implements--> `Root DOM Element`  [EXTRACTED]
  src/main.jsx → index.html
- `TheChat()` --calls--> `useMobile()`  [EXTRACTED]
  src/components/TheChat.jsx → src/hooks/useMobile.js
- `TheHierarchy()` --calls--> `useMobile()`  [EXTRACTED]
  src/components/TheHierarchy.jsx → src/hooks/useMobile.js
- `TheStratification()` --calls--> `useMobile()`  [EXTRACTED]
  src/components/TheStratification.jsx → src/hooks/useMobile.js

## Import Cycles
- None detected.

## Communities (28 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (4): IMAGES, cache, legacySupabase, supabase

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (14): TheHierarchy(), TIERS, STRAT_TIERS, TheStratification(), ARCHIVE_GRID_IMAGES, AUTHORS, CATEGORIES, IMAGES_POOL (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (10): Layout(), TheArchives(), BADGES, KNOWLEDGE_ITEMS, TheDossier(), TheFeed(), TheNexus(), useMobile() (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (8): app, auth, firebaseConfig, googleProvider, logOut(), signInWithGoogle(), StyledWrapper, StyledWrapper

### Community 4 - "Community 4"
Cohesion: 0.47
Nodes (6): Custom Caching Engine, Supabase, The Feed, The Forge (CMS), The Nexus, The Void (Immersive Reader)

### Community 21 - "Community 21"
Cohesion: 0.06
Nodes (10): StyledWrapper, StyledWrapper, StyledWrapper, StyledWrapper, StyledWrapper, DEFAULT_FILES, StyledWrapper, StyledWrapper (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (4): INITIAL_MESSAGES, TheChat(), StyledWrapper, StyledWrapper

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (6): 🏗️ Architecture & Data Workflow, 🛰️ Core Modules, 🚀 Deployment & Setup, DevDashboard (The Nexus), 📂 Project Structure, 🛠️ Technology Stack

## Knowledge Gaps
- **55 isolated node(s):** `StyledWrapper`, `IMAGES`, `INITIAL_MESSAGES`, `KNOWLEDGE_ITEMS`, `BADGES` (+50 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useMobile()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 22`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `The Nexus` (e.g. with `The Feed` and `The Forge (CMS)`) actually correct?**
  _`The Nexus` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `StyledWrapper`, `IMAGES`, `INITIAL_MESSAGES` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09057971014492754 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1383399209486166 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._