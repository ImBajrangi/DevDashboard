import React, { useState } from 'react';
import styled from 'styled-components';

const InstallButton = ({
  isInstalling: controlledIsInstalling,
  isCompleted: controlledIsCompleted,
  onComplete,
  onClick,
  duration = 3000,
  idleText = 'Download',
  completedText = 'Open',
  disabled = false,
  className = '',
  ...props
}) => {
  const [localStatus, setLocalStatus] = useState('idle'); // 'idle', 'installing', 'completed'

  const isControlled = controlledIsInstalling !== undefined || controlledIsCompleted !== undefined;
  
  const currentStatus = isControlled
    ? (controlledIsCompleted ? 'completed' : (controlledIsInstalling ? 'installing' : 'idle'))
    : localStatus;

  const handleToggle = (e) => {
    if (disabled || currentStatus !== 'idle') return;

    if (onClick) {
      onClick(e);
    }

    if (!isControlled) {
      setLocalStatus('installing');
      
      // Calculate total duration (3.5s in original 3s animation -> duration + 500ms)
      setTimeout(() => {
        setLocalStatus('completed');
        if (onComplete) {
          onComplete();
        }
      }, duration + 500);
    }
  };



  const installDuration = `${duration}ms`;
  const delay = `${Math.round(duration * 0.133)}ms`;
  const totalDuration = `${duration + 500}ms`;

  return (
    <StyledWrapper 
      style={{ 
        '--install-duration': installDuration,
        '--delay': delay,
        '--total-duration': totalDuration
      }} 
      className={className}
    >
      <div className="container">
        <label className={`label ${currentStatus === 'completed' ? 'completed' : ''}`}>
          <input 
            type="checkbox" 
            className="input" 
            checked={currentStatus !== 'idle'}
            onChange={handleToggle}
            disabled={disabled || currentStatus !== 'idle'}
            {...props}
          />
          <span className="circle">
            <svg className="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
            </svg>
            <div className="square" />
          </span>
          <p className="title">{idleText}</p>
          <p className="title">{completedText}</p>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    --primary: var(--color-primary, rgb(91, 91, 240));
    --primary-glow: color-mix(in srgb, var(--primary) 35%, transparent);
    --bg-main: var(--color-void-matte, transparent);
    --text-color: var(--color-text-main, #ffffff);
    --success: #10B981;
    --success-glow: rgba(16, 185, 129, 0.25);
    
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label {
    background-color: var(--bg-main);
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 160px;
    cursor: pointer;
    transition: 
      width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      border-color 0.4s ease,
      box-shadow 0.4s ease,
      background-color 0.4s ease;
    padding: 5px;
    position: relative;
    box-sizing: border-box;
    font-family: var(--font-display, sans-serif);
    font-weight: 600;
  }

  .label:hover:not(.completed):has(.input:not(:checked)) {
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      0 0 8px var(--primary-glow);
    border-color: color-mix(in srgb, var(--primary) 80%, white);
  }

  /* Rotating loading dot (orbital dot) */
  .label::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--text-color);
    width: 8px;
    height: 8px;
    transition: all 0.4s ease;
    border-radius: 100%;
    margin: auto;
    opacity: 0;
    visibility: hidden;
    z-index: 10;
    box-shadow: 0 0 6px var(--primary);
  }

  .label .input {
    display: none;
  }

  .label .title {
    font-size: 14px;
    font-family: var(--font-display, sans-serif);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-color);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    margin: 0;
    pointer-events: none;
  }

  .label .title:last-child {
    opacity: 0;
    visibility: hidden;
  }

  .label .circle {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 2;
    box-sizing: border-box;
  }

  .label .circle .icon {
    color: #ffffff;
    width: 26px;
    height: 26px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
    z-index: 2;
  }

  .label .circle .square {
    aspect-ratio: 1;
    width: 12px;
    border-radius: 2px;
    background-color: #ffffff;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
    z-index: 3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  /* Progress Overlay inside the Circle */
  .label .circle::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.35); /* Elegant dark fill overlay, works with any theme color */
    width: 100%;
    height: 0;
    transition: all 0.4s ease;
    z-index: 1;
  }

  /* --- Checked state / Installing state --- */
  .label:has(.input:checked) {
    width: 57px;
    cursor: default;
    animation: installed 0.4s ease var(--total-duration) forwards;
  }

  .label:has(.input:checked)::before {
    animation: rotate var(--install-duration) ease-in-out var(--delay) forwards;
  }

  .label .input:checked + .circle {
    animation:
      pulse 1s forwards,
      circleDelete 0.2s ease var(--total-duration) forwards;
    rotate: 180deg;
  }

  .label .input:checked + .circle::before {
    animation: installing var(--install-duration) ease-in-out forwards;
  }

  .label .input:checked + .circle .icon {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked + .circle .square,
  .label .input:checked ~ .circle .square {
    opacity: 1;
    visibility: visible;
  }

  .label .input:checked ~ .title {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked ~ .title:last-child {
    animation: showInstalledMessage 0.4s ease var(--total-duration) forwards;
  }

  /* --- Completed state lock (static overlay) --- */
  .label.completed {
    width: 150px !important;
    border-color: var(--success) !important;
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.25),
      0 0 10px var(--success-glow) !important;
    animation: none !important;
    cursor: pointer;
  }

  .label.completed::before {
    display: none !important;
  }

  .label.completed .circle {
    display: none !important;
    animation: none !important;
  }

  .label.completed .title {
    display: none !important;
  }

  .label.completed .title:last-child {
    opacity: 1 !important;
    visibility: visible !important;
    right: 56px !important;
    color: var(--success) !important;
    animation: none !important;
    font-size: 14px;
    font-weight: 700;
  }

  /* --- Animations --- */
  @keyframes pulse {
    0% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      scale: 1;
      box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
    }
    100% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  @keyframes installing {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  /* orbital dot rotation */
  @keyframes rotate {
    0% {
      transform: rotate(-90deg) translate(27px) rotate(0);
      opacity: 1;
      visibility: visible;
    }
    99% {
      transform: rotate(270deg) translate(27px) rotate(270deg);
      opacity: 1;
      visibility: visible;
    }
    100% {
      transform: rotate(270deg) translate(27px) rotate(270deg);
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes installed {
    100% {
      width: 150px;
      border-color: var(--success);
      box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.25),
        0 0 10px var(--success-glow);
    }
  }

  @keyframes circleDelete {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes showInstalledMessage {
    100% {
      opacity: 1;
      visibility: visible;
      right: 56px;
      color: var(--success);
    }
  }
`;

export default InstallButton;
