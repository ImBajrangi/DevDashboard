import React, { useState } from 'react';
import styled from 'styled-components';

const FavoriteToggle = ({ checked: controlledChecked, onChange, defaultChecked = false, ...props }) => {
  const [localChecked, setLocalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : localChecked;

  const handleChange = (e) => {
    if (!isControlled) {
      setLocalChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <StyledWrapper>
      <label className="fav-label">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={handleChange}
          className="fav-input" 
          style={{ display: 'none' }}
          {...props}
        />
        <div className="fav-button">
          <span className="fav-text">
            {checked ? 'SAVED' : 'FAVORITE'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="fav-star-svg"
          >
            <path 
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" 
            />
          </svg>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .fav-label {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
  }

  .fav-button {
    --primary: var(--color-primary, #FF3333);
    --primary-05: color-mix(in srgb, var(--primary) 5%, transparent);
    --primary-10: color-mix(in srgb, var(--primary) 10%, transparent);
    --primary-30: color-mix(in srgb, var(--primary) 30%, transparent);
    --primary-80: color-mix(in srgb, var(--primary) 80%, transparent);
    
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 9999px;
    border: 1px solid var(--primary-30);
    background: transparent;
    color: var(--primary);
    font-family: var(--font-mono, monospace);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .fav-button:hover {
    border-color: var(--primary-80);
    background: color-mix(in srgb, var(--primary) 6%, transparent);
    transform: translateY(-0.5px);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--primary) 10%, transparent);
  }

  .fav-label:active .fav-button {
    transform: scale(0.96);
  }

  /* Checked state styles */
  .fav-input:checked + .fav-button {
    border-color: var(--primary);
    background: var(--primary-10);
    box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 25%, transparent);
  }

  /* Text label inside button */
  .fav-text {
    transition: all 0.3s ease;
    text-transform: uppercase;
  }

  /* Star SVG styling */
  .fav-star-svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: var(--primary);
    stroke-width: 1.5;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), fill 0.3s ease;
  }

  .fav-button:hover .fav-star-svg {
    transform: scale(1.15) rotate(15deg);
  }

  .fav-input:checked + .fav-button .fav-star-svg {
    fill: var(--primary);
    stroke: var(--primary);
    transform: scale(1.2);
    animation: star-bounce 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.5) forwards;
  }

  @keyframes star-bounce {
    0% {
      transform: scale(1) rotate(0);
    }
    50% {
      transform: scale(1.5) rotate(-20deg);
    }
    100% {
      transform: scale(1.2) rotate(0);
    }
  }
`;

export default FavoriteToggle;
