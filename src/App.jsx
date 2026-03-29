import React, { useState, useEffect } from 'react'
import { SYNTHETIC_ARTICLES } from './data/syntheticData'
import Layout from './components/Layout'
import TheFeed from './components/TheFeed'
import TheVoid from './components/TheVoid'
import TheArchives from './components/TheArchives'
import TheTether from './components/TheTether'
import TheHierarchy from './components/TheHierarchy'
import TheArchiveGrid from './components/TheArchiveGrid'
import TheStratification from './components/TheStratification'
import TheDossier from './components/TheDossier'
import TheNexus from './components/TheNexus'
import TheNexusMobile from './components/TheNexusMobile'
import TheSignal from './components/TheSignal'
import TheSplash from './components/TheSplash'
import TheForge from './components/TheForge'
import ThePortal from './components/ThePortal'
import { useMobile } from './hooks/useMobile'
import { supabase, legacySupabase } from './lib/supabase'
import { cache } from './lib/cache';
import { auth } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const isMobile = useMobile()
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('nexus')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [allEntries, setAllEntries] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSignalOpen, setIsSignalOpen] = useState(false)
  const [systemSettings, setSystemSettings] = useState({
    typeface: 'serif',
    baseSize: 18,
    immersionMode: true
  })
  const [activeProject, setActiveProject] = useState('ALL_SYSTEMS');
  const [offset, setOffset] = useState(50);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const projects = [
    { id: 'ALL_SYSTEMS', label: 'All Global Systems', icon: 'Radio' },
    { id: 'SANT_VAANI_PREMIUM', label: 'Sant-Vaani Premium', icon: 'Star' },
    { id: 'VRINDA_BLOG', label: 'Vrinda Vaani (Blog)', icon: 'Heart' },
    { id: 'SPIRIT_DEV', label: 'Spirit-Dev Archive', icon: 'Code' }
  ];

  const [globalPremiumStats, setGlobalPremiumStats] = useState({
    totalReflections: 0,
    soulSeekers: 0
  })

  useEffect(() => {
    // Listen for Firebase Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    async function fetchData() {
      // 1. Check Cache for Instant Render
      const cachedFeed = cache.get('global_feed');
      if (cachedFeed && cachedFeed.length > 0) {
        setAllEntries(cachedFeed);
        // We don't set isLoading(false) here, so the global background 
        // "TRANSMITTING" indicator shows until the fresh data arrives.
      }

      try {
        // Use select('*') to be absolutely resilient against schema discrepancies between 
        // local and production databases. This avoids 400 errors when columns are missing.
        const [contentRes, vrindaRes, premiumJournalRes, premiumUserRes] = await Promise.all([
          legacySupabase.from('content').select('*').order('created_at', { ascending: false }).limit(50),
          supabase.from('blogvrinda').select('*').order('created_at', { ascending: false }).limit(50),
          legacySupabase.from('journal_entries').select('*', { count: 'exact', head: true }),
          legacySupabase.from('user_stats').select('*', { count: 'exact', head: true })
        ]);
        
        let contentData = contentRes.data;
        let contentError = contentRes.error;
        let vrindaData = vrindaRes.data;
        let vrindaError = vrindaRes.error;
        
        if (!premiumJournalRes.error || !premiumUserRes.error) {
          setGlobalPremiumStats({
            totalReflections: premiumJournalRes.count || 0,
            soulSeekers: premiumUserRes.count || 0
          });
        }

        // Note: No explicit fallback needed when using '*' as it only fetches existing columns.
  
        if (contentError) console.error('Error fetching global content:', contentError);
        if (vrindaError) console.error('Error fetching Vrinda content:', vrindaError);
  
        const transformedContent = (contentData || []).map(post => ({
          ...post,
          id: post.id || post.slug,
          stream: 'dev'
        }));
  
        const transformedVrinda = (vrindaData || []).map(post => ({
          ...post,
          id: post.id || post.slug,
          stream: 'vrinda'
        }));
  
        // Merge and sort by date
        const merged = [...transformedContent, ...transformedVrinda].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );

        const finalEntries = merged.length > 0 ? merged : SYNTHETIC_ARTICLES;
        
        // 2. Update Cache & State
        setAllEntries(finalEntries);
        if (merged.length > 0) {
          cache.set('global_feed', merged);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        if (!cachedFeed) setAllEntries(SYNTHETIC_ARTICLES);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    
    // Set up Supabase real-time listeners for both instances
    const legacyChannel = legacySupabase
      .channel('legacy-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content' },
        () => fetchData()
      )
      .subscribe();

    const mainChannel = supabase
      .channel('main-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blogvrinda' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      unsubscribeAuth()
      legacySupabase.removeChannel(legacyChannel)
      supabase.removeChannel(mainChannel)
    }
  }, [])

  const handleLoadMore = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    
    try {
      const BATCH = 50;
      const [contentRes, vrindaRes] = await Promise.all([
        legacySupabase.from('content').select('*').order('created_at', { ascending: false }).range(offset, offset + BATCH - 1),
        supabase.from('blogvrinda').select('*').order('created_at', { ascending: false }).range(offset, offset + BATCH - 1)
      ]);

      const transformedContent = (contentRes.data || []).map(post => ({ ...post, id: post.id || post.slug, stream: 'dev' }));
      const transformedVrinda = (vrindaRes.data || []).map(post => ({ ...post, id: post.id || post.slug, stream: 'vrinda' }));

      const merged = [...transformedContent, ...transformedVrinda].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );

      if (merged.length > 0) {
        setAllEntries(prev => [...prev, ...merged]);
        setOffset(prev => prev + BATCH);
      }
    } catch (err) {
      console.error('Deep Archive Sync Failure:', err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  if (showSplash) {
    return <TheSplash onEnter={() => setShowSplash(false)} />
  }

  // Derive Dynamic Categories
  const dynamicCategories = ['ALL', ...new Set((allEntries || []).map(entry => entry.category?.toUpperCase()).filter(Boolean))];
  
  // If user is logged in, add "MY_FEED"
  if (currentUser) {
    dynamicCategories.push('MY_FEED');
  }

  // Map Supabase entries to app format
  const mappedItems = (allEntries || []).map(item => {
    if (!item) return null;
    const isVrinda = item.stream === 'vrinda';
    return {
      id: item.id,
      title: item.title || "Untitled Transmission",
      source: isVrinda ? "VRINDA" : (item.category?.toUpperCase() || "SYSTEM"),
      clarity: isVrinda ? "88%" : "100%",
      date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.') : "00.00.00",
      readTime: isVrinda ? "08" : "12",
      author: item.author || "Unknown",
      content: item.english_translation || item.content_text || (typeof item.content === 'string' ? item.content : item.content?.content) || "",
      sanskrit: item.sanskrit_text || "",
      category: item.category || "General",
      tags: item.tags || [],
      audioUrl: item.audio_url,
      images: item.image_urls || item.images || [],
      createdBy: item.author_id || item.created_by,
      isVrinda: isVrinda
    };
  }).filter(Boolean);

  // Apply Global Project Filtering & Category Filtering
  const feedItems = mappedItems.filter(item => {
    // 1. Project Filter
    if (activeProject !== 'ALL_SYSTEMS') {
      const projectSourceMap = {
        'SANT_VAANI_PREMIUM': 'PREMIUM_REFLECT',
        'VRINDA_BLOG': 'VRINDA',
        'SPIRIT_DEV': 'DEV'
      }
      if (item.source !== projectSourceMap[activeProject]) return false;
    }

    // 2. Category Filter
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MY_FEED') {
      return item.author === currentUser?.displayName || item.author === "Vrindopnishad";
    }
    return item.source === selectedCategory;
  });

  const archiveItems = feedItems.map(item => ({ ...item, isRead: false }));

  // Dynamic Rankings based on Author contributions
  const authorStats = allEntries.reduce((acc, entry) => {
    const author = entry.author || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const dynamicRankings = Object.entries(authorStats)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending (most contributions first)
    .map(([name, count], idx) => ({
      pos: String(idx + 1).padStart(3, '0'),
      rank: idx + 1,
      name: (name || "Unknown").toUpperCase(),
      weight: (count * 10000).toLocaleString(),
      kw: (count * 100).toLocaleString(),
      uptime: `${Math.floor(Math.random() * 100)}%`,
      status: Math.random() > 0.3 ? 'ACTIVE' : 'IDLE',
      isCurrentUser: currentUser && name ? (name.toLowerCase() === currentUser.displayName?.toLowerCase()) : (name === "Vrindopnishad")
    }));

  const validTabs = ['nexus', 'feed', 'archives', 'grid', 'hierarchy', 'stratification', 'settings', 'profile', 'reader', 'forge', 'portal'];

  const handleArticleClick = async (article) => {
    if (article.id && validTabs.includes(article.id)) {
      setActiveTab(article.id)
    } else {
      // On-demand Fetch for Full Content (if it's a card from the optimized feed)
      if (!article.content_text && !article.content) {
        setIsLoading(true);
        try {
          // Check which stream it came from
          const client = article.stream === 'vrinda' ? supabase : legacySupabase;
          const table = article.stream === 'vrinda' ? 'blogvrinda' : 'content';
          
          const { data, error } = await client
            .from(table)
            .select('*')
            .eq('id', article.id)
            .maybeSingle();

          if (data) {
            setSelectedArticle({
              ...article,
              content: data.content_text || data.content,
              sanskrit: data.sanskrit_text || data.sanskrit
            });
            setActiveTab('reader');
          }
        } catch (err) {
          console.error('Error fetching full content:', err);
          setSelectedArticle(article);
          setActiveTab('reader');
        } finally {
          setIsLoading(false);
        }
      } else {
        setSelectedArticle(article);
        setActiveTab('reader');
      }
    }
    setIsSignalOpen(false);
  }

  const handleBackToFeed = () => {
    setSelectedArticle(null)
    setActiveTab('feed')
  }

  const updateSystemSettings = (newSettings) => {
    setSystemSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      settings={systemSettings}
      onSignalOpen={() => setIsSignalOpen(true)}
      user={currentUser}
      loading={isLoading}
      activeProject={activeProject}
      setActiveProject={setActiveProject}
      projects={projects}
    >
      {/* THE SIGNAL OVERLAY – derived from the_signal template */}
      {isSignalOpen && (
        <TheSignal 
          onClose={() => setIsSignalOpen(false)} 
          onSelection={handleArticleClick} 
          items={feedItems} 
          categories={dynamicCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {/* THE NEXUS – the_airlock_2 / the_airlock_7 template */}
      {activeTab === 'nexus' && (
        isMobile 
          ? <TheNexusMobile 
              onItemClick={handleArticleClick} 
              items={feedItems} 
              categories={dynamicCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onLoadMore={handleLoadMore}
              isFetchingMore={isFetchingMore}
            /> 
          : <TheNexus 
              onSignalClick={handleArticleClick} 
              allEntries={allEntries} 
              categories={dynamicCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              premiumStats={globalPremiumStats}
              activeProject={activeProject}
              onLoadMoreEntries={handleLoadMore}
              isFetchingMore={isFetchingMore}
            />
      )}

      {/* THE FEED – the_airlock_3 / the_airlock_15 template */}
      {activeTab === 'feed' && (
        <TheFeed 
          items={feedItems} 
          onItemClick={handleArticleClick} 
          categories={dynamicCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
        />
      )}

      {/* THE VOID – the_vrinda template (reader) */}
      {activeTab === 'reader' && (
        <TheVoid
          title={selectedArticle?.title || "Transmission Unknown"}
          author={selectedArticle?.author || "Link Restricted"}
          readTime={selectedArticle?.readTime || "0"}
          date={selectedArticle?.date || "00.00.00"}
          content={selectedArticle?.content}
          sanskrit={selectedArticle?.sanskrit}
          onBack={handleBackToFeed}
          settings={systemSettings}
          audioUrl={selectedArticle?.audioUrl}
          images={selectedArticle?.images || []}
          tags={selectedArticle?.tags || []}
        />
      )}

      {/* THE ARCHIVES */}
      {activeTab === 'archives' && (
        <TheArchives 
          items={archiveItems} 
          onItemClick={handleArticleClick} 
          categories={dynamicCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
        />
      )}

      {/* THE TETHER (settings) */}
      {activeTab === 'settings' && (
        <TheTether settings={systemSettings} onUpdateSettings={updateSystemSettings} />
      )}

      {/* THE HIERARCHY – airlock_16 / airlock_10 */}
      {activeTab === 'hierarchy' && (
        <TheHierarchy 
          users={dynamicRankings} 
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
        />
      )}

      {/* THE ARCHIVE GRID */}
      {activeTab === 'grid' && (
        <TheArchiveGrid 
          items={feedItems} 
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
        />
      )}

      {/* THE STRATIFICATION – airlock_5 / airlock_14 */}
      {activeTab === 'stratification' && (
        <TheStratification 
          operators={dynamicRankings} 
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
        />
      )}

      {/* THE DOSSIER */}
      {activeTab === 'profile' && (
        <TheDossier user={currentUser} allEntries={allEntries} />
      )}

      {/* THE FORGE (Content Management) */}
      {activeTab === 'forge' && (
        <TheForge categories={dynamicCategories} activeProject={activeProject} />
      )}

      {/* THE PORTAL (Admin & Notifications) */}
      {activeTab === 'portal' && (
        <ThePortal premiumStats={globalPremiumStats} />
      )}
    </Layout>
  )
}

export default App
