import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const DEFAULT_FILES = [
  { 
    id: '1', 
    name: 'Pitch_Deck.pptx', 
    tag: 'PPTX • 8.4 MB', 
    icon: (
      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
        <line x1={8} y1={21} x2={16} y2={21} />
        <line x1={12} y1={17} x2={12} y2={21} />
      </svg>
    ),
    color: '#FF5F6D'
  },
  { 
    id: '2', 
    name: 'Q3_Report.pdf', 
    tag: 'PDF • 1.1 MB', 
    icon: (
      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1={16} y1={13} x2={8} y2={13} />
        <line x1={16} y1={17} x2={8} y2={17} />
      </svg>
    ),
    color: '#FFC371'
  },
  { 
    id: '3', 
    name: 'app_config.json', 
    tag: 'JSON • 12 KB', 
    icon: (
      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: '#4FACFE'
  },
  { 
    id: '4', 
    name: 'Promo_Cut.mp4', 
    tag: 'MP4 • 128 MB', 
    icon: (
      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
      </svg>
    ),
    color: '#00F2FE'
  },
  { 
    id: '5', 
    name: 'Hero_BG.png', 
    tag: 'PNG • 4.2 MB', 
    icon: (
      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    color: '#A18CD1'
  }
];

const FolderCard = ({
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggle,
  files = DEFAULT_FILES,
  onFileClick,
  className = '',
  ...props
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : localIsOpen;

  const handleToggle = (e) => {
    if (!isControlled) {
      setLocalIsOpen(e.target.checked);
    }
    if (onToggle) {
      onToggle(e);
    }
  };

  // Filter files in real-time based on search input
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return files;
    return files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  return (
    <StyledWrapper className={className}>
      <label className="folder-card">
        <input 
          type="checkbox" 
          checked={isOpen}
          onChange={handleToggle}
          className="folder-toggle" 
          {...props}
        />
        
        {/* Click to open micro-hint */}
        <div className="hint-wrapper">
          <span className="hint-text">Expand Folder</span>
          <svg className="hint-arrow" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 32 6 C 32 6, 16 6, 12 24 M 12 24 L 5 18 M 12 24 L 19 21" stroke="var(--color-primary, #FF3333)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="folder-container">
          {/* Folder Back Cover */}
          <svg className="folder-back" viewBox="0 0 50 40" fill="none">
            <path 
              d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z" 
              fill="var(--color-border-void, #262626)" 
              className="folder-back-shape"
            />
          </svg>

          {/* Interactive Search Bar */}
          <div className="folder-search" onClick={(e) => e.stopPropagation()}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input" 
            />
          </div>

          {/* Staggered File Stack */}
          {filteredFiles.map((file, index) => {
            // Map indexes dynamically to retain visual stack ordering
            const fileClassIndex = files.length - files.findIndex(f => f.id === file.id);
            return (
              <div 
                key={file.id} 
                className={`file file-${fileClassIndex}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFileClick) onFileClick(file);
                }}
                style={{ '--file-accent': file.color }}
              >
                <div className="shine" />
                {file.icon}
                <div className="file-text">{file.name}</div>
                <div className="file-tag">{file.tag}</div>
              </div>
            );
          })}

          {/* Folder Front Cover with Counters */}
          <div className="folder-front-wrapper">
            <svg className="folder-front" viewBox="0 0 50 34" fill="none">
              <path 
                d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V30C50 32.2091 48.2091 34 46 34H4C1.79086 34 0 32.2091 0 30V4Z" 
                fill="color-mix(in srgb, var(--color-void-matte, #0a0a0a) 85%, transparent)"
                className="folder-front-shape"
              />
            </svg>
            <div className="folder-label" />
            
            {/* Status & Counter badge */}
            <div className="counter" onClick={(e) => e.stopPropagation()}>
              <div className="status-dot" />
              <span className="counter-label">FILES</span>
              <span className="counter-number">{String(filteredFiles.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .folder-card {
    --primary: var(--color-primary, #FF3333);
    --bg-dark: var(--color-void, #050505);
    --bg-card: var(--color-void-matte, #0a0a0a);
    --border-color: var(--color-border-void, #262626);
    --text-color: var(--color-text-main, #E5E5E5);
    --text-muted-color: var(--color-text-muted, #404040);
    
    width: 180px;
    height: 140px;
    perspective: 1200px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }

  .folder-toggle {
    display: none;
  }

  /* Micro blueprint arrow hint */
  .hint-wrapper {
    position: absolute;
    top: -45px;
    right: -45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    pointer-events: none;
    z-index: 100;
    animation: floatHint 3s ease-in-out infinite;
  }

  .hint-text {
    font-family: var(--font-mono, monospace);
    color: var(--primary);
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    right: -20px;
    top: 8px;
    transform: rotate(30deg);
    text-shadow: 0 0 10px color-mix(in srgb, var(--primary) 30%, transparent);
  }
  
  .hint-arrow {
    height: 32px;
    width: 32px;
    filter: drop-shadow(0 0 4px color-mix(in srgb, var(--primary) 30%, transparent));
  }

  @keyframes floatHint {
    0%, 100% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(4px) rotate(2deg);
    }
  }

  .folder-toggle:checked ~ .hint-wrapper {
    opacity: 0;
    transform: scale(0.8) translateY(-15px);
  }

  /* Folder container and 3D space */
  .folder-container {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    backface-visibility: hidden;
    will-change: transform;
  }

  .folder-toggle:checked ~ .folder-container {
    transform: rotateX(12deg) rotateY(-8deg);
  }

  .folder-back {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45));
  }

  .folder-back-shape {
    fill: var(--bg-card);
    stroke: var(--border-color);
    stroke-width: 1.2px;
    transition: stroke 0.3s ease;
  }

  .folder-card:hover .folder-back-shape {
    stroke: color-mix(in srgb, var(--primary) 30%, var(--border-color));
  }

  .folder-front-wrapper {
    position: absolute;
    bottom: -6px;
    width: 100%;
    z-index: 90;
    transform-origin: bottom;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1.1);
    border-radius: 8px;
    transform-style: preserve-3d;
    filter: drop-shadow(0 -4px 10px rgba(0, 0, 0, 0.15));
  }

  .folder-front-shape {
    stroke: var(--border-color);
    stroke-width: 1.2px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: stroke 0.3s ease;
  }

  .folder-card:hover .folder-front-shape {
    stroke: color-mix(in srgb, var(--primary) 30%, var(--border-color));
  }

  .folder-label {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 28px;
    height: 4px;
    background: color-mix(in srgb, var(--text-color) 20%, transparent);
    border-radius: 2px;
  }

  /* Status and count pill */
  .counter {
    position: absolute;
    top: -95px;
    right: -70px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 4px 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
    transform: scale(0) translateY(15px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1.2);
    z-index: 100;
  }

  .folder-toggle:checked ~ .folder-container .counter {
    transform: scale(1) translateY(0);
    opacity: 1;
    transition-delay: 0.18s;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #10B981;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 8px #10B981;
  }

  .status-dot::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #10B981;
    border-radius: 50%;
    animation: pulse 2.2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
  }

  .counter-label {
    font-family: var(--font-mono, monospace);
    font-size: 7.5px;
    font-weight: 800;
    color: var(--text-color);
    letter-spacing: 0.05em;
  }

  .counter-number {
    font-family: var(--font-mono, monospace);
    font-size: 11px;
    font-weight: 700;
    color: var(--primary);
    text-shadow: 0 0 8px color-mix(in srgb, var(--primary) 40%, transparent);
  }

  .counter:hover {
    border-color: var(--primary);
    transform: scale(1.08) translateY(-3px) !important;
  }

  /* File cards (translucent grid) */
  .file {
    position: absolute;
    bottom: 5px;
    left: 8%;
    width: 84%;
    height: 82px;
    border-radius: 6px;
    overflow: hidden;
    background: color-mix(in srgb, var(--bg-card) 75%, transparent);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid color-mix(in srgb, var(--file-accent, #fff) 25%, var(--border-color));
    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.05),
      0 4px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 0;
  }

  /* Z-index mapping */
  .file-1 { z-index: 25; transition-delay: 0.12s; }
  .file-2 { z-index: 24; transition-delay: 0.09s; }
  .file-3 { z-index: 23; transition-delay: 0.06s; }
  .file-4 { z-index: 22; transition-delay: 0.03s; }
  .file-5 { z-index: 21; transition-delay: 0s; }

  .shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 35%,
      rgba(255, 255, 255, 0.12) 50%,
      transparent 65%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .folder-toggle:checked ~ .folder-container .shine {
    transform: translateX(100%);
    transition: transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-delay: 0.25s;
  }

  .file-text {
    font-family: var(--font-mono, monospace);
    font-size: 8.5px;
    color: var(--text-color);
    padding: 12px;
    font-weight: 700;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.3s ease 0.35s;
    line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 24px);
  }

  .folder-toggle:checked ~ .folder-container .file-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* Action Trigger: folder opens */
  .folder-toggle:checked ~ .folder-container .folder-front-wrapper {
    transform: rotateX(-46deg);
  }

  .folder-toggle:checked ~ .folder-container .file-1 {
    transform: translateY(-64px) rotate(-8deg) translateX(-12px) translateZ(20px);
  }
  .folder-toggle:checked ~ .folder-container .file-2 {
    transform: translateY(-50px) rotate(6deg) translateX(14px) translateZ(10px);
  }
  .folder-toggle:checked ~ .folder-container .file-3 {
    transform: translateY(-36px) rotate(-11deg) translateX(-6px);
  }
  .folder-toggle:checked ~ .folder-container .file-4 {
    transform: translateY(-22px) rotate(8deg) translateX(10px);
  }
  .folder-toggle:checked ~ .folder-container .file-5 {
    transform: translateY(-8px) rotate(-4deg);
  }

  /* Staggered file hover states */
  .folder-toggle:checked ~ .folder-container .file:hover {
    cursor: pointer;
    background: color-mix(in srgb, var(--bg-card) 90%, var(--file-accent));
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.35),
      0 0 8px color-mix(in srgb, var(--file-accent) 40%, transparent);
  }

  .folder-toggle:checked ~ .folder-container .file-1:hover { transform: translateY(-72px) rotate(-8deg) translateX(-12px) translateZ(20px) scale(1.03); }
  .folder-toggle:checked ~ .folder-container .file-2:hover { transform: translateY(-58px) rotate(6deg) translateX(14px) translateZ(10px) scale(1.03); }
  .folder-toggle:checked ~ .folder-container .file-3:hover { transform: translateY(-44px) rotate(-11deg) translateX(-6px) scale(1.03); }
  .folder-toggle:checked ~ .folder-container .file-4:hover { transform: translateY(-30px) rotate(8deg) translateX(10px) scale(1.03); }
  .folder-toggle:checked ~ .folder-container .file-5:hover { transform: translateY(-16px) rotate(-4deg) scale(1.03); }

  .file-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 14px;
    height: 14px;
    color: color-mix(in srgb, var(--text-color) 30%, transparent);
    transition: color 0.3s ease;
  }

  .file-tag {
    position: absolute;
    bottom: 8px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    color: #ffffff;
    font-family: var(--font-mono, monospace);
    font-size: 6.5px;
    font-weight: 700;
    padding: 2.5px 5px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    transform: translateX(6px);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1.2);
    pointer-events: none;
  }

  .folder-toggle:checked ~ .folder-container .file:hover .file-icon {
    color: var(--file-accent);
  }
  .folder-toggle:checked ~ .folder-container .file:hover .file-tag {
    opacity: 1;
    transform: translateX(0);
  }

  /* Interactive search bar transition */
  .folder-search {
    position: absolute;
    top: -40px;
    left: 8%;
    width: 28px;
    height: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1.15);
    opacity: 0;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  .search-icon {
    width: 10px;
    height: 10px;
    color: var(--text-color);
    flex-shrink: 0;
    opacity: 0.6;
    transition: color 0.3s ease;
  }

  .search-input {
    background: transparent;
    border: none;
    color: var(--text-color);
    font-family: var(--font-mono, monospace);
    font-size: 8px;
    margin-left: 6px;
    outline: none;
    width: 0;
    transition: width 0.4s ease;
  }
  
  .search-input::placeholder {
    color: var(--text-muted-color);
  }

  .folder-toggle:checked ~ .folder-container .folder-search {
    opacity: 1;
    top: -76px;
    width: 84%;
  }

  .folder-toggle:checked ~ .folder-container .folder-search:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 20%, transparent);
    width: 90%;
  }

  .folder-toggle:checked ~ .folder-container .folder-search:focus-within .search-icon {
    color: var(--primary);
    opacity: 1;
  }

  .folder-toggle:checked ~ .folder-container .folder-search:focus-within .search-input {
    width: 100%;
  }
`;

export default FolderCard;
