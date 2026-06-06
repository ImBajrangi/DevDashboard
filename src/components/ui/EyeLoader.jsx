import React from 'react';
import styled from 'styled-components';

const EyeLoader = ({ size = 78, className = '' }) => {
  return (
    <StyledWrapper style={{ '--loader-size': `${size}px` }} className={className}>
      <div className="eye-loader">
        <div className="iris-laser" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .eye-loader {
    --primary: var(--color-primary, #FF3333);
    --bg-void: var(--color-void-matte, #0a0a0a);
    --border-color: var(--color-border-void, #262626);
    --white-glow: var(--color-text-main, #E5E5E5);
    
    position: relative;
    width: var(--loader-size);
    height: var(--loader-size);
    border-radius: 50%;
    background: color-mix(in srgb, var(--white-glow) 12%, var(--bg-void));
    border: calc(var(--loader-size) * 0.08) solid var(--border-color);
    box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.6),
      inset 0 0 10px rgba(0, 0, 0, 0.8),
      0 0 0 1px color-mix(in srgb, var(--primary) 10%, transparent);
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  /* Cybernetic Eyelid */
  .eye-loader::after {
    content: '';
    position: absolute;
    left: -1px;
    top: -50%;
    width: calc(100% + 2px);
    height: 100%;
    background: var(--bg-void);
    z-index: 5;
    border-bottom: calc(var(--loader-size) * 0.08) solid var(--border-color);
    box-sizing: border-box;
    animation: eyeShade 4s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  /* Glowing Holographic Pupil/Iris */
  .eye-loader::before {
    content: '';
    position: absolute;
    left: calc(var(--loader-size) * 0.28);
    bottom: calc(var(--loader-size) * 0.22);
    width: calc(var(--loader-size) * 0.38);
    height: calc(var(--loader-size) * 0.38);
    z-index: 2;
    background: radial-gradient(
      circle at center, 
      #ffffff 0%, 
      var(--primary) 30%, 
      color-mix(in srgb, var(--primary) 60%, black) 70%,
      transparent 100%
    );
    border-radius: 50%;
    box-shadow: 0 0 15px var(--primary);
    animation: eyeMove 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    box-sizing: border-box;
  }

  /* Scanline overlay inside the eye */
  .iris-laser {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      color-mix(in srgb, var(--primary) 20%, transparent) 50%
    );
    background-size: 100% 4px;
    z-index: 3;
    pointer-events: none;
    mix-blend-mode: overlay;
    border-radius: 50%;
  }

  /* Holographic HUD reflection ring */
  .eye-loader::before {
    border: 1.5px solid rgba(255, 255, 255, 0.25);
  }

  @keyframes eyeShade {
    0%, 100% {
      transform: translateY(0);
    }
    18% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(calc(var(--loader-size) * 0.55)); /* Blink down */
    }
    24% {
      transform: translateY(0); /* Open */
    }
    50% {
      transform: translateY(calc(var(--loader-size) * -0.05));
    }
    68% {
      transform: translateY(calc(var(--loader-size) * -0.05));
    }
    70% {
      transform: translateY(calc(var(--loader-size) * 0.55)); /* Double Blink */
    }
    74% {
      transform: translateY(0);
    }
    85% {
      transform: translateY(calc(var(--loader-size) * 0.05));
    }
  }

  @keyframes eyeMove {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      filter: brightness(1);
    }
    15% {
      transform: translate(calc(var(--loader-size) * 0.1), calc(var(--loader-size) * -0.05)) scale(1.05);
    }
    30% {
      transform: translate(calc(var(--loader-size) * -0.12), calc(var(--loader-size) * 0.05)) scale(0.95);
      filter: brightness(0.9);
    }
    45% {
      transform: translate(calc(var(--loader-size) * -0.05), calc(var(--loader-size) * -0.08)) scale(1);
    }
    60% {
      transform: translate(calc(var(--loader-size) * 0.15), calc(var(--loader-size) * 0.05)) scale(1.1);
      filter: brightness(1.1);
    }
    78% {
      transform: translate(0, calc(var(--loader-size) * 0.08)) scale(0.98);
    }
    90% {
      transform: translate(calc(var(--loader-size) * -0.08), calc(var(--loader-size) * -0.02)) scale(1.02);
    }
  }
`;

export default EyeLoader;
