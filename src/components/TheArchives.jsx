import React from 'react';
import { useMobile } from '../hooks/useMobile';
import TheArchivesMobile from './TheArchivesMobile';

/**
 * TheArchives component – from the_archives template.
 * A clean article list with filter tabs (ALL, UNREAD, FINISHED).
 * Features: Large serif titles, date/read-time metadata, strikethrough for read articles.
 */
const TheArchives = ({ items = [], onItemClick = () => { }, categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange, onLoadMore, isFetchingMore }) => {
    const isMobile = useMobile();

    if (isMobile) {
        return (
            <TheArchivesMobile 
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
            {/* Header */}
            <header className="flex items-center justify-between px-12 py-10 border-b border-border-void">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
                    // THE_ARCHIVES_V.1.0
                </span>
                <div className="flex gap-6 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange && onCategoryChange(cat)}
                            className={`pb-1 transition-all duration-200 ${selectedCategory === cat ? 'text-text-main font-bold border-b border-text-main' : 'hover:text-text-main border-b border-transparent'}`}
                        >
                            {cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </header>

            {/* Article List */}
            <div className="px-12 py-6">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="archive-row py-12 flex items-center justify-between cursor-pointer group"
                        onClick={() => onItemClick(item)}
                    >
                        <h3 className={`text-[28px] md:text-[36px] font-bold tracking-tight leading-tight transition-colors font-display ${item.isRead ? 'text-text-muted line-through decoration-border-void' : 'text-text-main/80'}`}>
                            {item.title}
                        </h3>
                        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-text-muted shrink-0 ml-8">
                            <span>{item.date || '24.10.2023'}</span>
                            <span>·</span>
                            <span>{item.readTime || '12'} MIN READ</span>
                        </div>
                    </div>
                ))}

                {/* Global Archive Sync Trigger */}
                <div className="mt-12 py-20 flex flex-col items-center justify-center border-t border-border-void/30">
                    <div className={`w-1 h-8 bg-primary mb-4 ${isFetchingMore ? 'animate-ping' : 'animate-pulse'}`} />
                    <button 
                        onClick={onLoadMore}
                        disabled={isFetchingMore}
                        className={`font-mono text-[10px] uppercase tracking-[0.5em] border border-border-void px-8 py-4 hover:bg-primary hover:text-white transition-all duration-500 ${isFetchingMore ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                    >
                        {isFetchingMore ? '[ TRANSMITTING_RECORDS... ]' : '[ SYNC_EXTENDED_ARCHIVE ]'}
                    </button>
                    <span className="mt-4 font-mono text-[8px] text-text-muted uppercase tracking-widest opacity-40">
                        Coordinate: {items.length} Archival Nodes Decrypted
                    </span>
                </div>
            </div>
        </>
    );
};

export default TheArchives;
