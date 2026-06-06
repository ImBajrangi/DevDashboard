import React, { useRef } from 'react';

/**
 * SearchInput component - A premium, high-performance search input
 * that morphs from a magnifying glass to an expanded search field.
 * 
 * Completely converted from styled-components to Tailwind and custom CSS keyframes
 * to ensure maximum performance and seamless dark-mode integration.
 */
const SearchInput = ({ value, onChange, placeholder = "Search archives..." }) => {
  const inputRef = useRef(null);

  return (
    <div className="flex items-center justify-center p-4">
      {/* Scoped CSS styling for complex keyframe transforms */}
      <style>{`
        .morph-search-form {
          position: relative;
          width: 100%;
          max-width: 17rem;
          margin: auto;
        }

        .morph-search-input {
          display: block;
          margin: auto;
          width: 2.2rem;
          height: 2.2rem;
          background: transparent;
          border-radius: 50%;
          color: #e5e5e5;
          caret-color: #FF3333;
          box-shadow: 0 0 0 0.2rem inset #404040;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          appearance: none;
          -webkit-appearance: none;
          padding: 0;
          outline: none;
          border: none;
        }

        /* Hover state when collapsed - glowing aura */
        .morph-search-input:hover {
          box-shadow: 0 0 0 0.2rem inset #FF3333, 0 0 12px rgba(255, 51, 51, 0.35);
          cursor: pointer;
        }

        /* Active/Expanded State (focused or has content) */
        .morph-search-input:focus,
        .morph-search-input:not(:placeholder-shown) {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 0.25rem;
          box-shadow: 0 0 0 1px rgba(255, 51, 51, 0.4), 0 10px 30px rgba(0, 0, 0, 0.6);
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          width: 100%;
          height: 3rem;
          cursor: text;
        }

        .morph-search-input:focus {
          animation: morphShowCaret 1s steps(1);
          outline: none;
        }

        /* Morphing Caret / Magnifying Glass Handle */
        .morph-search-caret {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          background: #404040;
          border-radius: 0 0 0.125rem 0.125rem;
          width: 0.22rem;
          height: 0.9rem;
          transform-origin: 50% 0;
          /* Offsets the handle to complete the magnifying glass design */
          transform: translate(-50%, -50%) translate(0.65rem, 0.65rem) rotate(-45deg);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .morph-search-input:hover + .morph-search-caret {
          background: #FF3333;
        }

        /* Morph animation trigger */
        .morph-search-input:focus + .morph-search-caret,
        .morph-search-input:not(:placeholder-shown) + .morph-search-caret {
          animation: morphHandleToCaret 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          background: #FF3333;
          width: 1.5px;
          height: 1.25rem;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%) rotate(0deg);
        }

        @keyframes morphShowCaret {
          from { caret-color: transparent; }
          to { caret-color: #FF3333; }
        }

        @keyframes morphHandleToCaret {
          from {
            background: #404040;
            width: 0.22rem;
            height: 0.9rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) translate(0.65rem, 0.65rem) rotate(-45deg);
          }
          35% {
            background: #FF3333;
            width: 0.22rem;
            height: 0.9rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) translate(0.65rem, 0.65rem) rotate(-180deg);
          }
          70% {
            background: #FF3333;
            width: 1.5px;
            height: 1.25rem;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%) rotate(-180deg);
          }
          to {
            background: transparent;
            width: 1.5px;
            height: 1.25rem;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%) rotate(-360deg);
          }
        }

        /* Remove browser-specific search decorations */
        .morph-search-input::-webkit-search-decoration,
        .morph-search-input::-webkit-search-cancel-button {
          -webkit-appearance: none;
          appearance: none;
        }
      `}</style>

      <form className="morph-search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-field" className="sr-only">
          {placeholder}
        </label>
        <input
          id="search-field"
          ref={inputRef}
          type="search"
          placeholder=" "
          className="morph-search-input font-mono"
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        <span className="morph-search-caret" />
      </form>
    </div>
  );
};

export default SearchInput;
