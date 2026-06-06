import React, { useState } from 'react';
import styled from 'styled-components';

const LikeToggle = ({ checked: controlledChecked, onChange, defaultChecked = false, ...props }) => {
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
      <label className="con-like">
        <input 
          className="like" 
          type="checkbox" 
          title="like" 
          checked={checked}
          onChange={handleChange}
          style={{ display: 'none' }}
          {...props}
        />
        <div className="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" className="outline" viewBox="0 0 24 24" width="18" height="18">
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24" width="18" height="18">
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40" className="celebrate">
            <polygon className="poly" points="10,10 20,20" />
            <polygon className="poly" points="10,50 20,50" />
            <polygon className="poly" points="20,80 30,70" />
            <polygon className="poly" points="90,10 80,20" />
            <polygon className="poly" points="90,50 80,50" />
            <polygon className="poly" points="80,80 70,70" />
          </svg>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .con-like {
    --red: var(--color-primary, rgb(255, 50, 50));
    position: relative;
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .con-like:hover {
    transform: scale(1.15);
  }

  .con-like .like {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .con-like .checkmark {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .con-like .outline {
    fill: var(--red);
    position: absolute;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .con-like:hover .outline {
    opacity: 0.8;
  }

  .con-like .filled {
    fill: var(--red);
    position: absolute;
    animation: kfr-filled 0.5s;
    display: none;
  }

  .con-like .celebrate {
    position: absolute;
    animation: kfr-celebrate 0.5s;
    animation-fill-mode: forwards;
    display: none;
    pointer-events: none;
    z-index: 10;
  }

  .con-like .poly {
    stroke: var(--red);
    fill: var(--red);
    stroke-width: 2px;
  }

  .con-like .like:checked ~ .checkmark .filled {
    display: block
  }

  .con-like .like:checked ~ .checkmark .celebrate {
    display: block
  }

  @keyframes kfr-filled {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    50% {
      opacity: 1;
      transform: scale(1.3);
    }
    
    100% {
      transform: scale(1);
    }
  }

  @keyframes kfr-celebrate {
    0% {
      transform: scale(0);
      opacity: 0;
    }

    50% {
      opacity: 0.8;
    }

    100% {
      transform: scale(1.2);
      opacity: 0;
      display: none;
    }
  }
`;

export default LikeToggle;
