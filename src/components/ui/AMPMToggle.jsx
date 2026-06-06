import React from 'react';
import styled from 'styled-components';

const AMPMToggle = ({ checked = false, onChange }) => {
  return (
    <StyledWrapper>
      <div className="time-toggle-container" onClick={onChange}>
        <div className={`time-toggle-option ${!checked ? 'active' : ''}`}>
          12H
        </div>
        <div className={`time-toggle-option ${checked ? 'active' : ''}`}>
          24H
        </div>
        <div className="time-toggle-slider" style={{ left: checked ? 'calc(50% + 2px)' : '2px' }} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .time-toggle-container {
    --primary: var(--color-primary, #FF3333);
    --primary-10: color-mix(in srgb, var(--primary) 10%, transparent);
    --primary-20: color-mix(in srgb, var(--primary) 20%, transparent);
    --primary-30: color-mix(in srgb, var(--primary) 30%, transparent);

    display: flex;
    position: relative;
    width: 96px;
    height: 26px;
    background: #090909;
    border: 1px solid var(--color-border-void, #262626);
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .time-toggle-container:hover {
    border-color: color-mix(in srgb, var(--primary) 40%, transparent);
  }

  .time-toggle-option {
    flex: 1;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono, monospace);
    font-size: 9px;
    font-weight: 800;
    color: #404040;
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
  }

  .time-toggle-option.active {
    color: var(--primary);
  }

  .time-toggle-slider {
    position: absolute;
    top: 2px;
    bottom: 2px;
    width: calc(50% - 4px);
    background: var(--primary-10);
    border: 1px solid var(--primary);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 0 6px var(--primary-20);
    z-index: 1;
  }

  .time-toggle-container:active .time-toggle-slider {
    width: calc(50% - 2px);
  }

  /* === LIGHT MODE OVERRIDES === */
  :root.light & {
    .time-toggle-container {
      background: #e1e7ec;
      border-color: var(--color-border-void, #d1d9e6);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .time-toggle-option {
      color: #808890;
    }

    .time-toggle-option.active {
      color: var(--primary);
    }

    .time-toggle-slider {
      background: #ffffff;
      border-color: var(--primary-30);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 6px var(--primary-20);
    }
  }
`;

export default AMPMToggle;
