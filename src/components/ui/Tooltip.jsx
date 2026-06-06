import React from 'react';
import styled from 'styled-components';

const Tooltip = ({ followers = "45k", label = "Follow", onAction }) => {
  return (
    <StyledWrapper onClick={onAction}>
      <div className="tooltip-container">
        <span className="tooltip">{followers}</span>
        <span className="text">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 95 114" className="svgIcon">
            <rect fill="currentColor" rx="28.5" height={57} width={57} x={19} />
            <path fill="currentColor" d="M0 109.5C0 83.2665 21.2665 62 47.5 62V62C73.7335 62 95 83.2665 95 109.5V114H0V109.5Z" />
          </svg>
          {label}
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-block;

  .tooltip-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s;
    background-color: var(--color-void-matte, rgb(255, 255, 255));
    padding: 11px 18px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid var(--color-border-void, rgb(211, 211, 211));
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-main, rgb(0, 0, 0));
  }

  .svgIcon {
    width: 16px;
    height: auto;
    color: var(--color-text-main, rgb(0, 0, 0));
  }

  .tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.3em 0.6em;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    background-color: var(--color-void-matte, rgb(255, 255, 255));
    border: 1px solid var(--color-border-void, rgb(211, 211, 211));
    border-radius: 12px;
    color: var(--color-text-main, rgb(34, 34, 34));
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .tooltip::before {
    position: absolute;
    content: "";
    height: 0.6em;
    width: 0.6em;
    bottom: -0.35em;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    background-color: var(--color-void-matte, rgb(255, 255, 255));
    border-right: 1px solid var(--color-border-void, rgb(211, 211, 211));
    border-bottom: 1px solid var(--color-border-void, rgb(211, 211, 211));
  }

  .tooltip-container:hover .tooltip {
    top: -110%;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .tooltip-container:active {
    transform: scale(0.96);
  }
`;

export default Tooltip;
