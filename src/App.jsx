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
import { useMobile } from './hooks/useMobile'
import { supabase } from './lib/supabase'
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
    typeface: 'serif', // 'serif' or 'mono'
    baseSize: 18,      // 14 to 32
    immersionMode: true
  })

  useEffect(() => {
    // Listen for Firebase Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        // Use Supabase data if available, otherwise fall back to synthetic
        setAllEntries(data && data.length > 0 ? data : SYNTHETIC_ARTICLES);
      } catch (err) {
        console.error('Error fetching content:', err);
        // Fallback to synthetic data on error
        setAllEntries(SYNTHETIC_ARTICLES);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // Set up Supabase real-time listener if needed
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      unsubscribeAuth()
      supabase.removeChannel(channel)
    }
  }, [])

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
    return {
      id: item.id,
      title: item.title || "Untitled Transmission",
      source: item.category?.toUpperCase() || "SYSTEM",
      clarity: "100%",
      date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.') : "00.00.00",
      readTime: "12",
      author: item.author || "Unknown",
      content: item.content_text || (typeof item.content === 'string' ? item.content : item.content?.content) || "",
      sanskrit: item.sanskrit_text || "",
      category: item.category || "General",
      tags: item.tags || [],
      audioUrl: item.audio_url,
      images: item.image_urls || item.images || [],
      createdBy: item.author_id || item.created_by // assume field exists or fallback
    };
  }).filter(Boolean);

  // Apply Filtering
  const feedItems = mappedItems.filter(item => {
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

  const validTabs = ['nexus', 'feed', 'archives', 'grid', 'hierarchy', 'stratification', 'settings', 'profile', 'reader', 'forge'];

  const handleArticleClick = (article) => {
    if (article.id && validTabs.includes(article.id)) {
      setActiveTab(article.id)
    } else {
      setSelectedArticle(article)
      setActiveTab('reader')
    }
    setIsSignalOpen(false)
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
            /> 
          : <TheNexus 
              onSignalClick={handleArticleClick} 
              allEntries={allEntries} 
              categories={dynamicCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
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
        />
      )}

      {/* THE TETHER (settings) */}
      {activeTab === 'settings' && (
        <TheTether settings={systemSettings} onUpdateSettings={updateSystemSettings} />
      )}

      {/* THE HIERARCHY – airlock_16 / airlock_10 */}
      {activeTab === 'hierarchy' && (
        <TheHierarchy users={dynamicRankings} />
      )}

      {/* THE ARCHIVE GRID */}
      {activeTab === 'grid' && (
        <TheArchiveGrid items={feedItems} />
      )}

      {/* THE STRATIFICATION – airlock_5 / airlock_14 */}
      {activeTab === 'stratification' && (
        <TheStratification operators={dynamicRankings} />
      )}

      {/* THE DOSSIER */}
      {activeTab === 'profile' && (
        <TheDossier user={currentUser} allEntries={allEntries} />
      )}

      {/* THE FORGE (Content Management) */}
      {activeTab === 'forge' && (
        <TheForge categories={dynamicCategories} />
      )}
    </Layout>
  )
}

export default App
