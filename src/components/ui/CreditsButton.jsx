import React from 'react';
import styled from 'styled-components';

const CreditsButton = ({ children = 'Credits', onClick, disabled = false, type = 'button', ...props }) => {
  return (
    <StyledWrapper>
      <button type={type} className="credits-button" onClick={onClick} disabled={disabled} {...props}>
        <span className="fold-corner" />
        <div className="particles-container">
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
          <i className="particle" />
        </div>
        <span className="inner-content">
          <svg className="credits-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
            <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
          </svg>
          {children}
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .credits-button {
    --primary: var(--color-primary, #FF3333);
    --primary-glow: color-mix(in srgb, var(--primary) 60%, transparent);
    --round: 8px;
    
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%);
    border-radius: var(--round);
    border: none;
    outline: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
    font-family: var(--font-mono, monospace);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    min-height: unset;
    min-width: unset;
  }

  .credits-button::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(var(--round) - 1px);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 1;
    pointer-events: none;
  }

  .credits-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45), 
                0 0 12px var(--primary-glow);
  }

  .credits-button:active {
    transform: translateY(0) scale(0.95);
  }

  .credits-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Fold corner: slides out of view on hover */
  .fold-corner {
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    height: 12px;
    width: 12px;
    background: radial-gradient(
      100% 75% at 55%,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    box-shadow: 0 0 3px black;
    border-bottom-left-radius: 4px;
    transition: all 0.5s ease-in-out;
  }

  /* Fold moves off screen on hover */
  .credits-button:hover .fold-corner {
    margin-top: -12px;
    margin-right: -12px;
  }

  /* Floating embers particle system */
  .particles-container {
    overflow: hidden;
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .particles-container .particle {
    bottom: -10px;
    position: absolute;
    pointer-events: none;
    width: 3px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 50%;
    filter: drop-shadow(0 0 2px #ffffff);
    animation: float-up 2s infinite ease-out;
    opacity: 0;
  }

  @keyframes float-up {
    0% {
      transform: translateY(0) scale(0.6);
      opacity: 0;
    }
    15% {
      opacity: 0.9;
    }
    85% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(-50px) scale(1.1) translateX(var(--drift, 10px));
      opacity: 0;
    }
  }

  /* Particle animation offsets */
  .particle:nth-child(1) { left: 10%; --drift: -8px; animation-duration: 2.1s; animation-delay: 0.1s; }
  .particle:nth-child(2) { left: 28%; --drift: 6px; animation-duration: 1.8s; animation-delay: 0.4s; }
  .particle:nth-child(3) { left: 45%; --drift: -4px; animation-duration: 2.4s; animation-delay: 0.2s; }
  .particle:nth-child(4) { left: 62%; --drift: 8px; animation-duration: 1.9s; animation-delay: 0.5s; }
  .particle:nth-child(5) { left: 80%; --drift: -6px; animation-duration: 2.2s; animation-delay: 0.3s; }
  .particle:nth-child(6) { left: 18%; --drift: 5px; animation-duration: 2.0s; animation-delay: 0.7s; }
  .particle:nth-child(7) { left: 37%; --drift: -7px; animation-duration: 1.7s; animation-delay: 0.9s; }
  .particle:nth-child(8) { left: 53%; --drift: 9px; animation-duration: 2.5s; animation-delay: 0.2s; }
  .particle:nth-child(9) { left: 71%; --drift: -5px; animation-duration: 2.3s; animation-delay: 0.6s; }
  .particle:nth-child(10) { left: 90%; --drift: 7px; animation-duration: 1.6s; animation-delay: 0.1s; }

  .inner-content {
    z-index: 3;
    gap: 8px;
    position: relative;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .credits-icon {
    width: 14px;
    height: 14px;
    stroke: #ffffff;
    transition: fill 0.15s linear;
  }

  .credits-button:hover .credits-icon {
    fill: transparent;
    animation:
      dasharray 1s linear forwards,
      filled 0.1s linear forwards 0.95s;
  }

  @keyframes dasharray {
    from {
      stroke-dasharray: 0 100;
    }
    to {
      stroke-dasharray: 68 0;
    }
  }

  @keyframes filled {
    to {
      fill: #ffffff;
    }
  }
`;

export default CreditsButton;
