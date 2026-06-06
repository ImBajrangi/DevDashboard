import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CloudSaveButton = ({ 
  onClick, 
  isSaving: controlledIsSaving, 
  isSaved: controlledIsSaved, 
  disabled = false, 
  children = 'Save', 
  type = 'button',
  ...props 
}) => {
  const [localIsSaving, setLocalIsSaving] = useState(false);
  const [localIsSaved, setLocalIsSaved] = useState(false);

  const isSavingControlled = controlledIsSaving !== undefined;
  const isSavedControlled = controlledIsSaved !== undefined;

  const isSaving = isSavingControlled ? controlledIsSaving : localIsSaving;
  const isSaved = isSavedControlled ? controlledIsSaved : localIsSaved;

  const handleClick = async (e) => {
    if (disabled || isSaving || isSaved) return;

    if (onClick) {
      if (!isSavingControlled && !isSavedControlled) {
        setLocalIsSaving(true);
        try {
          await onClick(e);
          setLocalIsSaving(false);
          setLocalIsSaved(true);
        } catch (err) {
          setLocalIsSaving(false);
        }
      } else {
        onClick(e);
      }
    } else if (!isSavingControlled && !isSavedControlled) {
      setLocalIsSaving(true);
      setTimeout(() => {
        setLocalIsSaving(false);
        setLocalIsSaved(true);
      }, 1500);
    }
  };

  useEffect(() => {
    if (isSaved && !isSavedControlled) {
      const timer = setTimeout(() => {
        setLocalIsSaved(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSaved, isSavedControlled]);

  const buttonText = isSaving ? 'Saving...' : isSaved ? 'Saved!' : children;

  return (
    <StyledWrapper>
      <button 
        type={type} 
        className={`cloud-save-btn ${isSaving ? 'saving' : ''} ${isSaved ? 'saved' : ''}`}
        onClick={handleClick}
        disabled={disabled || isSaving}
        {...props}
      >
        <div className="svg-wrapper">
          {isSaving ? (
            <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" className="spinner-track" />
            </svg>
          ) : isSaved ? (
            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="cloud-icon">
              <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
            </svg>
          )}
        </div>
        <span className="button-text">{buttonText}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .cloud-save-btn {
    --primary: var(--color-primary, #FF3333);
    --bg-main: var(--color-void-matte, #0a0a0a);
    --border-color: var(--color-border-void, #262626);
    --text-color: var(--color-text-main, #E5E5E5);
    
    font-family: var(--font-mono, monospace);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--bg-main);
    color: var(--text-color);
    fill: color-mix(in srgb, var(--text-color) 40%, transparent);
    padding: 10px 18px 10px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    min-height: unset;
    min-width: 100px;
  }

  .cloud-save-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
    pointer-events: none;
  }

  .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: relative;
    transition: transform 0.5s ease-in-out;
  }

  .cloud-icon {
    width: 18px;
    height: 18px;
    transition: all 0.5s ease-in-out;
  }

  .button-text {
    display: block;
    transition: all 0.5s linear;
    opacity: 1;
  }

  /* Hover state: text fades to 0 opacity, cloud slides to center (translateX) */
  .cloud-save-btn:hover:not(:disabled):not(.saving):not(.saved) {
    background: color-mix(in srgb, var(--primary) 4%, var(--bg-main));
    border-color: color-mix(in srgb, var(--primary) 40%, var(--border-color));
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 
                0 0 10px color-mix(in srgb, var(--primary) 15%, transparent);
  }

  .cloud-save-btn:hover:not(:disabled):not(.saving):not(.saved) .svg-wrapper {
    transform: translateX(1.5em) scale(1.15);
  }

  .cloud-save-btn:hover:not(:disabled):not(.saving):not(.saved) .cloud-icon {
    fill: #ffffff;
    filter: drop-shadow(0 0 4px color-mix(in srgb, var(--primary) 60%, transparent));
  }

  .cloud-save-btn:hover:not(:disabled):not(.saving):not(.saved) .button-text {
    opacity: 0;
  }

  /* Active state */
  .cloud-save-btn:active:not(:disabled) {
    transform: scale(0.95);
  }

  /* Saving (Loading) State */
  .cloud-save-btn.saving {
    background: color-mix(in srgb, var(--primary) 6%, var(--bg-main));
    border-color: var(--primary);
    color: var(--primary);
    cursor: wait;
  }

  .spinner-icon {
    width: 16px;
    height: 16px;
    color: var(--primary);
    animation: rotate 1.2s linear infinite;
  }

  .spinner-track {
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  /* Saved (Success) State */
  .cloud-save-btn.saved {
    background: color-mix(in srgb, var(--primary) 8%, var(--bg-main));
    border-color: var(--primary);
    color: var(--primary);
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: var(--primary);
    animation: checkmark-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.5) forwards;
  }

  @keyframes checkmark-pop {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .cloud-save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default CloudSaveButton;
