import React from 'react';
import { useMobile } from '../hooks/useMobile';
import TheFeedMobile from './TheFeedMobile';

/**
 * TheFeed – exact clone of the_airlock_3/code.html
 * Note: Layout already provides pl-[60px] for the sidebar, so we subtract 60px from all paddings.
 * Template header: pl-[180px] → we need pl-[120px]
 * Template main:   pl-[120px] → we need pl-[60px]
 */
const TheFeed = ({ items = [], onItemClick, categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange, onLoadMore, isFetchingMore }) => {
    const isMobile = useMobile();
    if (isMobile) {
        return (
            <TheFeedMobile 
                items={items} 
                onItemClick={onItemClick} 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onCategoryChange={onCategoryChange} 
                onLoadMore={onLoadMore}
                isFetchingMore={isFetchingMore}
            />
        );
    }
    return (
        <>
            {/* Header – template uses pl-[180px] pt-24 pb-12 pr-12 */}
            <header className="pl-[120px] pt-24 pb-12 pr-12">
                <div className="flex items-end justify-between border-b border-border-void pb-4">
                    <div>
                        <h1 className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted mb-2">
                            System // Directory
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tighter font-display">THE FEED</h2>
                    </div>
                    <div className="flex gap-6 font-mono text-[9px] tracking-widest text-text-muted uppercase">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange && onCategoryChange(cat)}
                                className={`pb-1 transition-all duration-200 ${selectedCategory === cat ? 'text-text-main border-b border-text-main' : 'hover:text-text-main border-b border-transparent'}`}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main feed – template uses pl-[120px] pb-24 */}
            <main className="pl-[60px] pb-32">
                <div className="flex flex-col gap-4">
                    {items.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className="feed-row group px-16 py-14 flex flex-col md:flex-row md:items-center justify-between border-b border-border-void"
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase tracking-widest meta-text text-text-muted">
                                    Transmission // {String(idx + 1).padStart(3, '0')}
                                </span>
                                <h3 className="text-2xl font-bold leading-[1.2] tracking-tight font-display mb-2">{item.title}</h3>
                            </div>
                            <div className="flex items-center gap-12 mt-6 md:mt-0 font-mono text-xs uppercase tracking-widest">
                                <div className="flex flex-col items-end">
                                    <span className="meta-text text-text-muted text-[10px]">Source</span>
                                    <span>{item.source}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="meta-text text-text-muted text-[10px]">Clarity</span>
                                    <span>{item.clarity}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="meta-text text-text-muted text-[10px]">Date</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Deep Archive Sync Trigger */}
                    <div className="px-12 py-20 flex flex-col items-center justify-center border-t border-border-void/30">
                        <div className={`w-1 h-8 bg-primary mb-4 ${isFetchingMore ? 'animate-ping' : 'animate-pulse'}`} />
                        <button 
                            onClick={onLoadMore}
                            disabled={isFetchingMore}
                            className={`font-mono text-[10px] uppercase tracking-[0.5em] border border-border-void px-8 py-4 hover:bg-primary hover:text-white transition-all duration-500 ${isFetchingMore ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                        >
                            {isFetchingMore ? '[ TRANSMITTING_SIGNAL... ]' : '[ SYNC_NEXT_BATCH ]'}
                        </button>
                        <span className="mt-4 font-mono text-[8px] text-text-muted uppercase tracking-widest opacity-40">
                            Coordinate: {items.length} Records Decrypted
                        </span>
                    </div>
                </div>
            </main>

            {/* Fixed bottom-right footer */}
            <footer className="fixed bottom-6 right-8 pointer-events-none">
                <div className="flex items-center gap-4 text-text-muted font-mono text-[10px] tracking-widest">
                    <span>TOTAL ENTRIES: {items.length}</span>
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    <span>SYSTEM: NOMINAL</span>
                </div>
            </footer>
        </>
    );
};

export default TheFeed;
