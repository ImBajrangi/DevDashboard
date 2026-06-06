import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

const DayNightSwitch = ({ checked = false, onChange }) => {
  return (
    <StyledWrapper>
      <label className="theme-toggle">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
          className="theme-input" 
        />
        <div className="theme-slider">
          <div className="theme-track">
            <Moon size={10} className="icon moon" />
            <Sun size={10} className="icon sun" />
          </div>
          <div className="theme-handle">
            {checked ? (
              <Sun size={9} className="handle-icon text-yellow-500 fill-yellow-500/20" />
            ) : (
              <Moon size={9} className="handle-icon text-blue-400 fill-blue-400/20" />
            )}
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .theme-toggle {
    --primary: var(--color-primary, #FF3333);
    --primary-20: color-mix(in srgb, var(--primary) 20%, transparent);
    --primary-40: color-mix(in srgb, var(--primary) 40%, transparent);
    
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    min-height: unset;
    min-width: unset;
  }

  .theme-input {
    display: none;
  }

  .theme-slider {
    width: 50px;
    height: 24px;
    background: #090909;
    border: 1px solid var(--color-border-void, #262626);
    border-radius: 12px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .theme-track {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    pointer-events: none;
  }

  .theme-track .icon {
    color: #333333;
    transition: color 0.3s ease;
  }

  .theme-input:not(:checked) + .theme-slider .theme-track .moon {
    color: var(--primary);
  }

  .theme-input:checked + .theme-slider .theme-track .sun {
    color: var(--primary);
  }

  .theme-handle {
    width: 16px;
    height: 16px;
    background: #1a1a1a;
    border: 1px solid var(--color-border-void, #262626);
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .theme-handle .handle-icon {
    transition: transform 0.3s ease;
  }

  /* Hover States */
  .theme-toggle:hover .theme-slider {
    border-color: var(--primary-40);
  }

  /* Checked/Light Mode state */
  .theme-input:checked + .theme-slider {
    background: #111111;
  }

  .theme-input:checked + .theme-slider .theme-handle {
    left: 29px;
    background: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  }

  .theme-toggle:active .theme-handle {
    width: 20px;
  }

  .theme-input:checked:active + .theme-slider .theme-handle {
    left: 25px;
  }

  /* === LIGHT MODE OVERRIDES === */
  :root.light & {
    .theme-slider {
      background: #e1e7ec;
      border-color: var(--color-border-void, #d1d9e6);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .theme-track .icon {
      color: #b0b8c0;
    }

    .theme-handle {
      background: #ffffff;
      border-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }
    
    .theme-input:checked + .theme-slider {
      background: #f0f4f8;
    }
  }
`;

export default DayNightSwitch;
