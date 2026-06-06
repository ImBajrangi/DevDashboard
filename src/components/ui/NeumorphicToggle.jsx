import React from 'react';
import styled from 'styled-components';

const NeumorphicToggle = ({ checked = false, onChange, disabled = false, id, name, ...props }) => {
  return (
    <StyledWrapper>
      <label className={`label ${disabled ? 'disabled' : ''}`}>
        <div className="toggle">
          <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            id={id}
            name={name}
            className="toggle-state" 
            {...props}
          />
          <div className="indicator" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .label {
    --primary: var(--color-primary, #FF3333);
    --bg-color: var(--color-toggle-bg, #151515);
    --shd-light: var(--color-toggle-shadow-light, rgba(255, 255, 255, 0.03));
    --shd-dark: var(--color-toggle-shadow-dark, rgba(0, 0, 0, 0.6));
    --shd-light-inset: var(--color-toggle-shadow-light-inset, rgba(255, 255, 255, 0.02));
    --shd-dark-inset: var(--color-toggle-shadow-dark-inset, rgba(0, 0, 0, 0.6));

    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .label.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .toggle {
    isolation: isolate;
    position: relative;
    height: 30px;
    width: 60px;
    border-radius: 15px;
    overflow: hidden;
    background: var(--bg-color);
    border: 1px solid var(--color-border-void, rgba(255, 255, 255, 0.03));
    box-shadow: 
      -6px -3px 8px var(--shd-light),
      6px 3px 10px var(--shd-dark),
      4px 4px 4px var(--shd-dark-inset) inset,
      -4px -4px 4px var(--shd-light-inset) inset;
    transition: all 0.3s ease;
  }

  .toggle-state {
    display: none;
  }

  .indicator {
    height: 100%;
    width: 200%;
    background: var(--bg-color);
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow: 
      -6px -3px 8px var(--shd-light),
      6px 3px 10px var(--shd-dark);
  }

  .toggle-state:checked ~ .indicator {
    transform: translate3d(25%, 0, 0);
    background: color-mix(in srgb, var(--primary) 10%, var(--bg-color));
  }

  .label:not(.disabled):hover .toggle {
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .label:active:not(.disabled) .toggle {
    transform: scale(0.96);
  }
`;

export default NeumorphicToggle;

