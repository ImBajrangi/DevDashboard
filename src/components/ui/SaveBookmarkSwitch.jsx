import React, { useState } from 'react';

const SaveBookmarkSwitch = ({
  checked: controlledChecked,
  defaultChecked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  const [localChecked, setLocalChecked] = useState(defaultChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : localChecked;

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) {
      setLocalChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={`inline-block select-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
        {...props}
      />
      <div className="
        group flex w-fit items-center gap-2 overflow-hidden rounded-full 
        border border-primary/30 hover:border-primary/80 p-2 px-3
        font-mono text-[10px] font-extrabold tracking-widest text-primary
        transition-all active:scale-90
        peer-checked:bg-primary
        peer-checked:text-void-matte
      ">
        {/* Text slides right on hover */}
        <div className="z-10 transition-transform duration-500 ease-out group-hover:translate-x-4">
          {isChecked ? 'SAVED' : 'SAVE'}
        </div>
        {/* SVG scales by 750% and translates left/up to fill button background on hover */}
        <svg
          className="
            size-6 fill-none stroke-current transition-all duration-500 ease-out z-0
            group-hover:-translate-x-6 group-hover:-translate-y-3 group-hover:scale-[750%]
            peer-checked:fill-void-matte
          "
          style={{
            fill: isChecked ? 'currentColor' : 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </div>
    </label>
  );
};

export default SaveBookmarkSwitch;
