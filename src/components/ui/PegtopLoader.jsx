import React from 'react';
import styled from 'styled-components';

const PegtopLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg id="pegtopone" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
          <defs>
            <filter id="shine">
              <feGaussianBlur stdDeviation={3} />
            </filter>
            <mask id="mask1">
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
            </mask>
            <radialGradient id="gradient-1-1" cx={50} cy={66} fx={50} fy={66} r={30} gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="50%" stopColor="black" stopOpacity="0.1" />
              <stop offset="100%" stopColor="black" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-1-2" cx={55} cy={20} fx={55} fy={20} r={30} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-1-3" cx={85} cy={50} fx={85} fy={50} xlinkHref="#gradient-1-2" />
            <radialGradient id="gradient-1-4" cx={50} cy={58} fx={50} fy={58} r={60} gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-1-3" />
            <linearGradient id="gradient-1-5" x1={50} y1={90} x2={50} y2={10} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.2" />
              <stop offset="40%" stopColor="black" stopOpacity={0} />
            </linearGradient>
          </defs>
          <g>
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-1)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth={3} filter="url(#shine)" mask="url(#mask1)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-2)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-3)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-4)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-5)" />
          </g>
        </svg>
        <svg id="pegtoptwo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
          <defs>
            <filter id="shine">
              <feGaussianBlur stdDeviation={3} />
            </filter>
            <mask id="mask2">
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
            </mask>
            <radialGradient id="gradient-2-1" cx={50} cy={66} fx={50} fy={66} r={30} gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="50%" stopColor="black" stopOpacity="0.1" />
              <stop offset="100%" stopColor="black" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-2-2" cx={55} cy={20} fx={55} fy={20} r={30} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-2-3" cx={85} cy={50} fx={85} fy={50} xlinkHref="#gradient-2-2" />
            <radialGradient id="gradient-2-4" cx={50} cy={58} fx={50} fy={58} r={60} gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-2-3" />
            <linearGradient id="gradient-2-5" x1={50} y1={90} x2={50} y2={10} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.2" />
              <stop offset="40%" stopColor="black" stopOpacity={0} />
            </linearGradient>
          </defs>
          <g>
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-1)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth={3} filter="url(#shine)" mask="url(#mask2)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-2)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-3)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-4)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-5)" />
          </g>
        </svg>
        <svg id="pegtopthree" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
          <defs>
            <filter id="shine">
              <feGaussianBlur stdDeviation={3} />
            </filter>
            <mask id="mask3">
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
            </mask>
            <radialGradient id="gradient-3-1" cx={50} cy={66} fx={50} fy={66} r={30} gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="50%" stopColor="black" stopOpacity="0.1" />
              <stop offset="100%" stopColor="black" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-3-2" cx={55} cy={20} fx={55} fy={20} r={30} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="gradient-3-3" cx={85} cy={50} fx={85} fy={50} xlinkHref="#gradient-3-2" />
            <radialGradient id="gradient-3-4" cx={50} cy={58} fx={50} fy={58} r={60} gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-3-3" />
            <linearGradient id="gradient-3-5" x1={50} y1={90} x2={50} y2={10} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="black" stopOpacity="0.2" />
              <stop offset="40%" stopColor="black" stopOpacity={0} />
            </linearGradient>
          </defs>
          <g>
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-1)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth={3} filter="url(#shine)" mask="url(#mask3)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-2)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-3)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-4)" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-5)" />
          </g>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .loader {
    --fill-color: var(--color-primary, #FF3333);
    --shine-color: color-mix(in srgb, var(--color-primary, #FF3333) 20%, transparent);
    transform: scale(0.5); /* You can change the size */
    width: 100px;
    height: 60px;
    position: relative;
    filter: drop-shadow(0 0 10px var(--shine-color));
    color: var(--fill-color);
  }

  .loader #pegtopone {
    position: absolute;
    animation: flowe-one 1.2s linear infinite;
  }

  .loader #pegtoptwo {
    position: absolute;
    opacity: 0;
    transform: scale(0) translateY(-200px) translateX(-100px);
    animation: flowe-two 1.2s linear infinite;
    animation-delay: 0.4s;
  }

  .loader #pegtopthree {
    position: absolute;
    opacity: 0;
    transform: scale(0) translateY(-200px) translateX(100px);
    animation: flowe-three 1.2s linear infinite;
    animation-delay: 0.8s;
  }

  .loader svg g path:first-child {
    fill: var(--fill-color);
  }

  @keyframes flowe-one {
    0% {
      transform: scale(0.5) translateY(-60px);
      opacity: 0;
    }
    25% {
      transform: scale(0.75) translateY(-30px);
      opacity: 1;
    }
    50% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
    75% {
      transform: scale(0.5) translateY(15px);
      opacity: 1;
    }
    100% {
      transform: scale(0) translateY(30px);
      opacity: 0;
    }
  }

  @keyframes flowe-two {
    0% {
      transform: scale(0.5) rotateZ(-10deg) translateY(-60px) translateX(-30px);
      opacity: 0;
    }
    25% {
      transform: scale(1) rotateZ(-5deg) translateY(-30px) translateX(-15px);
      opacity: 1;
    }
    50% {
      transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-7px);
      opacity: 1;
    }
    75% {
      transform: scale(0.5) rotateZ(5deg) translateY(15px) translateX(0px);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotateZ(10deg) translateY(30px) translateX(7px);
      opacity: 0;
    }
  }

  @keyframes flowe-three {
    0% {
      transform: scale(0.5) rotateZ(10deg) translateY(-60px) translateX(30px);
      opacity: 0;
    }
    25% {
      transform: scale(1) rotateZ(5deg) translateY(-30px) translateX(15px);
      opacity: 1;
    }
    50% {
      transform: scale(1) rotateZ(0deg) translateY(0px) translateX(7px);
      opacity: 1;
    }
    75% {
      transform: scale(0.5) rotateZ(-5deg) translateY(15px) translateX(0px);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotateZ(-10deg) translateY(30px) translateX(-7px);
      opacity: 0;
    }
  }
`;

export default PegtopLoader;
