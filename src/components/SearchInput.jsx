import React from 'react';
import styled from 'styled-components';

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search archives...", 
  onSubmit, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <StyledWrapper className={className}>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search</label>
        <input 
          required 
          pattern=".*\S.*" 
          type="search" 
          className="input" 
          id="search"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          {...props}
        />
        <span className="caret" />
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .input {
    color: var(--color-text-main, #E5E5E5);
    font: 1em/1.5 var(--font-mono, monospace);
  }

  form, .input, .caret {
    margin: auto;
  }

  form {
    position: relative;
    width: 100%;
    max-width: 17em;
  }

  .input, .caret {
    display: block;
    transition: all calc(1s * 0.5) linear;
  }

  .input {
    background: transparent;
    border-radius: 50%;
    box-shadow: 0 0 0 0.25em inset;
    caret-color: var(--color-primary, #FF3333);
    width: 2em;
    height: 2em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
  }

  .input:focus, .input:valid {
    background: color-mix(in srgb, var(--color-void-matte, #0a0a0a) 85%, transparent);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--color-border-void, #262626);
    border-radius: 0.25em;
    box-shadow: none;
    padding: 0.75em 1em;
    transition-duration: calc(1s * 0.25);
    transition-delay: calc(1s * 0.25);
    width: 100%;
    height: 3em;
  }

  .input:focus {
    animation: showCaret 1s steps(1);
    outline: transparent;
    border-color: var(--color-primary, #FF3333);
  }

  .input:focus + .caret, .input:valid + .caret {
    animation: handleToCaret 1s linear forwards;
    background: transparent;
    width: 1px;
    height: 1.5em;
    transform: translate(0,-1em) rotate(-180deg) translate(7.5em,-0.25em);
  }

  .input::-webkit-search-decoration,
  .input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  label {
    color: #e3e4e8;
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
  }

  .caret {
    background: var(--color-text-main, #E5E5E5);
    border-radius: 0 0 0.125em 0.125em;
    margin-bottom: -0.6em;
    width: 0.25em;
    height: 1em;
    transform: translate(0,-1em) rotate(-45deg) translate(0,0.875em);
    transform-origin: 50% 0;
    pointer-events: none;
  }

  /* Animations */
  @keyframes showCaret {
    from {
      caret-color: transparent;
    }

    to {
      caret-color: var(--color-primary, #FF3333);
    }
  }

  @keyframes handleToCaret {
    from {
      background: var(--color-text-main, #E5E5E5);
      width: 0.25em;
      height: 1em;
      transform: translate(0,-1em) rotate(-45deg) translate(0,0.875em);
    }

    25% {
      background: var(--color-text-main, #E5E5E5);
      width: 0.25em;
      height: 1em;
      transform: translate(0,-1em) rotate(-180deg) translate(0,0.875em);
    }

    50%, 62.5% {
      background: var(--color-primary, #FF3333);
      width: 1px;
      height: 1.5em;
      transform: translate(0,-1em) rotate(-180deg) translate(7.5em,2.5em);
    }

    75%, 99% {
      background: var(--color-primary, #FF3333);
      width: 1px;
      height: 1.5em;
      transform: translate(0,-1em) rotate(-180deg) translate(7.5em,-0.25em);
    }

    87.5% {
      background: var(--color-primary, #FF3333);
      width: 1px;
      height: 1.5em;
      transform: translate(0,-1em) rotate(-180deg) translate(7.5em,0.125em);
    }

    to {
      background: transparent;
      width: 1px;
      height: 1.5em;
      transform: translate(0,-1em) rotate(-180deg) translate(7.5em,-0.25em);
    }
  }
`;

export default SearchInput;
