import React from 'react';
import styled from 'styled-components';

const Loader = ({ size = 200 }) => {
  return (
    <StyledWrapper style={{ '--loader-width': `${size}px` }}>
      <svg viewBox="0 0 100 100" className="loader">
        <g className="points"> 
          <circle fill="currentColor" r={50} cy={50} cx={50} className="ciw" />
          <circle r={4} cy={50} cx={5} className="ci2" />
          <circle r={4} cy={50} cx={95} className="ci1" />
        </g>
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .loader {
    --higru: var(--color-primary, #FF3333);
    width: var(--loader-width, 200px);
    height: var(--loader-width, 200px);
    max-height: 900px;
    transform-origin: 50% 50%;
    overflow: visible;
    color: var(--color-void-matte, #0a0a0a);
  }

  .ci1 {
    fill: var(--higru);
    animation: toBig 3s infinite -1.5s;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  .ciw {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: breath 3s infinite;
  }

  .ci2 {
    fill: var(--higru);
    animation: toBig2 3s infinite;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  .points {
    animation: rot 3s infinite;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    30% {
      transform: rotate(360deg);
    }

    50% {
      transform: rotate(360deg);
    }

    80% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes toBig {
    0% {
      transform: scale(1) translateX(0px);
    }

    30% {
      transform: scale(1) translateX(0px);
    }

    50% {
      transform: scale(10) translateX(-4.5px);
    }

    80% {
      transform: scale(10) translateX(-4.5px);
    }

    100% {
      transform: scale(1) translateX(0px);
    }
  }

  @keyframes toBig2 {
    0% {
      transform: scale(1) translateX(0px);
    }

    30% {
      transform: scale(1) translateX(0px);
    }

    50% {
      transform: scale(10) translateX(4.5px);
    }

    80% {
      transform: scale(10) translateX(4.5px);
    }

    100% {
      transform: scale(1) translateX(0px);
    }
  }

  @keyframes breath {
    15% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.1);
    }

    65% {
      transform: scale(1);
    }

    90% {
      transform: scale(1.1);
    }
  }
`;

export default Loader;
