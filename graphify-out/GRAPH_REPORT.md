# Graph Report - .  (2026-06-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 98 nodes · 112 edges · 21 communities (10 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17d2a864`
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

## God Nodes (most connected - your core abstractions)
1. `The Nexus` - 5 edges
2. `cache` - 3 edges
3. `supabase` - 3 edges
4. `legacySupabase` - 3 edges
5. `Supabase` - 3 edges
6. `App()` - 2 edges
7. `Layout()` - 2 edges
8. `TheDossier()` - 2 edges
9. `TheFeed()` - 2 edges
10. `TheNexus()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `The Nexus` --references--> `Custom Caching Engine`  [EXTRACTED]
  README.md → src/lib/cache.js
- `Main Entry Point` --implements--> `Root DOM Element`  [EXTRACTED]
  src/main.jsx → index.html

## Import Cycles
- None detected.

## Communities (21 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (4): IMAGES, cache, legacySupabase, supabase

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (12): TIERS, STRAT_TIERS, ARCHIVE_GRID_IMAGES, AUTHORS, CATEGORIES, IMAGES_POOL, SYNTHETIC_ARTICLES, SYNTHETIC_OPERATORS (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (7): Layout(), BADGES, KNOWLEDGE_ITEMS, TheDossier(), TheFeed(), TheNexus(), App()

### Community 3 - "Community 3"
Cohesion: 0.24
Nodes (6): app, auth, firebaseConfig, googleProvider, logOut(), signInWithGoogle()

### Community 4 - "Community 4"
Cohesion: 0.47
Nodes (6): Custom Caching Engine, Supabase, The Feed, The Forge (CMS), The Nexus, The Void (Immersive Reader)

## Knowledge Gaps
- **29 isolated node(s):** `IMAGES`, `KNOWLEDGE_ITEMS`, `BADGES`, `TIERS`, `STRAT_TIERS` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `The Nexus` (e.g. with `The Feed` and `The Forge (CMS)`) actually correct?**
  _`The Nexus` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `IMAGES`, `KNOWLEDGE_ITEMS`, `BADGES` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._