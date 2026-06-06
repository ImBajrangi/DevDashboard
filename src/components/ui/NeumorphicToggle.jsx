import React from 'react';
import styled from 'styled-components';

const NeumorphicToggle = ({ checked = false, onChange, disabled = false, id, name, ...props }) => {
  return (
    <StyledWrapper>
      <label className={`neumorphic-switch-label ${disabled ? 'disabled' : ''}`}>
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={id}
          name={name}
          className="switch-input" 
          {...props}
        />
        <div className="switch-track">
          <div className="switch-indicator" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .neumorphic-switch-label {
    --primary: var(--color-primary, #FF3333);
    --bg-color: var(--color-toggle-bg, #151515);
    --shd-light: var(--color-toggle-shadow-light, rgba(255, 255, 255, 0.03));
    --shd-dark: var(--color-toggle-shadow-dark, rgba(0, 0, 0, 0.6));
    --shd-light-inset: var(--color-toggle-shadow-light-inset, rgba(255, 255, 255, 0.02));
    --shd-dark-inset: var(--color-toggle-shadow-dark-inset, rgba(0, 0, 0, 0.6));
    
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    min-height: unset;
    min-width: unset;
  }

  .neumorphic-switch-label.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch-input {
    display: none;
  }

  .switch-track {
    isolation: isolate;
    position: relative;
    height: 32px;
    width: 68px;
    border-radius: 16px;
    background: var(--bg-color);
    border: 1px solid var(--color-border-void, rgba(255, 255, 255, 0.03));
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 
      -3px -3px 8px var(--shd-light-inset) inset,
      3px 3px 8px var(--shd-dark-inset) inset,
      -1px -1px 3px var(--shd-light-inset),
      1px 1px 3px var(--shd-dark-inset);
    overflow: hidden;
  }

  .switch-indicator {
    height: 22px;
    width: 22px;
    background: color-mix(in srgb, var(--bg-color) 90%, white);
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
    transform: translate3d(0, 0, 0);
    transition: 
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 0.3s ease,
      box-shadow 0.3s ease,
      width 0.3s ease;
    box-shadow: 
      -3px -3px 8px var(--shd-light),
      3px 3px 8px var(--shd-dark);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Dot accent in the center of indicator */
  .switch-indicator::after {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #555555;
    transition: all 0.3s ease;
  }

  /* Hover state styling */
  .neumorphic-switch-label:not(.disabled):hover .switch-track {
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .neumorphic-switch-label:not(.disabled):hover .switch-indicator {
    background: color-mix(in srgb, var(--bg-color) 80%, white);
  }

  /* Checked/Active state styling */
  .switch-input:checked + .switch-track {
    box-shadow: 
      -3px -3px 8px var(--shd-light-inset) inset,
      3px 3px 8px var(--shd-dark-inset) inset,
      0 0 10px color-mix(in srgb, var(--primary) 20%, transparent);
  }

  .switch-input:checked + .switch-track .switch-indicator {
    transform: translate3d(36px, 0, 0);
    background: var(--primary);
    box-shadow: 
      0 0 12px var(--primary),
      -2px -2px 6px rgba(255, 255, 255, 0.2) inset,
      2px 2px 6px rgba(0, 0, 0, 0.4) inset;
  }

  .switch-input:checked + .switch-track .switch-indicator::after {
    background: #ffffff;
    box-shadow: 0 0 4px #ffffff;
    transform: scale(1.3);
  }

  /* Squeeze/Elastic tactile feedback on click */
  .neumorphic-switch-label:active:not(.disabled) .switch-indicator {
    width: 28px;
  }

  .switch-input:checked:active:not(.disabled) + .switch-track .switch-indicator {
    transform: translate3d(30px, 0, 0);
  }
`;

export default NeumorphicToggle;
