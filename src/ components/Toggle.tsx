import React, { useState } from 'react';

interface Option {
  value: any;
  label: string;
}

interface Props {
  value: any | null;
  options: Option[];
  altText: string;
  disabled?: boolean;
  onUpdate: (val: any | null) => void;
}

const toggleStyle = (isSelected: boolean, disabled: boolean) => {
  if (isSelected) return 'bg-primary active:bg-primary-active text-on-primary';
  return !disabled
    ? 'bg-inactive text-on-inactive active:bg-primary-active ' + 'hover:bg-primary-hover hover:text-on-primary active:text-on-primary'
    : '';
};

const matchValueType = (value: any, newValue: any) => {
  return typeof newValue === 'string' ? newValue : value;
};

const Toggle: React.FC<Props> = ({ value, options, altText, disabled = false, onUpdate }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    const newValue = matchValueType(value, event.currentTarget.value);

    if (onUpdate) {
      onUpdate(newValue);
    } else {
      setSelectedValue(newValue);
    }
  };

  return (
    <div className="inline-block">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium text-on-background-alternate">{altText}</h2>
      </div>

      <legend className="sr-only">{altText}</legend>
      <div className="toggle-container inline-flex items-center justify-center rounded-full bg-inactive text-sm font-medium focus:outline-none">
        {options.map((option) => (
          <label
            key={option.value}
            className={`sm:flex-0 flex-shrink-0 cursor-pointer rounded-full border-transparent py-1 px-3 ${toggleStyle(
              selectedValue === option.value,
              disabled
            )}`}
          >
            <input
              type="radio"
              disabled={disabled}
              name="selected"
              value={option.value}
              className="sr-only"
              aria-labelledby={`${option.value}`}
              onClick={handleClick}
            />
            <span id={`${option.value}`}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
