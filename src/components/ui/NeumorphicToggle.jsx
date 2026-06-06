import React from 'react';
import styled from 'styled-components';

const NeumorphicToggle = ({ checked = false, onChange }) => {
  return (
    <StyledWrapper>
      <label className="cyber-toggle">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
          className="cyber-input" 
        />
        <div className="cyber-slider">
          <div className="cyber-handle" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .cyber-toggle {
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

  .cyber-input {
    display: none;
  }

  .cyber-slider {
    width: 44px;
    height: 22px;
    background: #090909;
    border: 1px solid var(--color-border-void, #262626);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .cyber-handle {
    width: 12px;
    height: 12px;
    background: #333333;
    border-radius: 2px;
    position: absolute;
    top: 4px;
    left: 4px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Hover States */
  .cyber-toggle:hover .cyber-slider {
    border-color: var(--primary-40);
  }

  .cyber-toggle:hover .cyber-handle {
    background: #4a4a4a;
  }

  /* Active/Checked States */
  .cyber-input:checked + .cyber-slider {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 5%, #050505);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px var(--primary-20);
  }

  .cyber-input:checked + .cyber-slider .cyber-handle {
    left: 26px;
    background: var(--primary);
    box-shadow: 0 0 8px var(--primary);
  }

  .cyber-toggle:active .cyber-handle {
    width: 16px;
  }

  .cyber-input:checked:active + .cyber-slider .cyber-handle {
    left: 22px;
  }

  /* === LIGHT MODE OVERRIDES === */
  :root.light & {
    .cyber-slider {
      background: #e1e7ec;
      border-color: var(--color-border-void, #d1d9e6);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .cyber-handle {
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }

    .cyber-toggle:hover .cyber-handle {
      background: #f5f5f5;
    }

    .cyber-input:checked + .cyber-slider {
      background: color-mix(in srgb, var(--primary) 8%, #e1e7ec);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 0 8px var(--primary-20);
    }
  }
`;

export default NeumorphicToggle;
