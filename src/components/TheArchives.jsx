import React from 'react';

/**
 * TheArchives component – from the_archives template.
 * A clean article list with filter tabs (ALL, UNREAD, FINISHED).
 * Features: Large serif titles, date/read-time metadata, strikethrough for read articles.
 */
const TheArchives = ({ items = [], onItemClick = () => { } }) => {
    return (
        <>
            {/* Header */}
            <header className="flex items-center justify-between px-12 py-10 border-b border-border-void">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
                    // THE_ARCHIVES_V.1.0
                </span>
                <div className="flex gap-6 font-mono text-[11px] uppercase tracking-widest">
                    <button className="text-text-main font-bold border-b border-text-main pb-1">All</button>
                    <button className="text-text-muted hover:text-text-main pb-1 transition-colors">Unread</button>
                    <button className="text-text-muted hover:text-text-main pb-1 transition-colors">Finished</button>
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
            </div>
        </>
    );
};

export default TheArchives;
