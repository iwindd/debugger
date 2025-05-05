import React from "react";

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  step?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({ step = 1, value, onChange, ...rest }) => {
  const handleStep = (direction: number) => {
    const currentValue = typeof value === "number" ? value : parseFloat(value as string) || 0;
    const newValue = currentValue + direction * step;

    if (onChange) {
      const fakeEvent = {
        ...((event || {}) as any),
        target: {
          ...((event?.target || {}) as any),
          value: newValue,
        },
      };
      onChange(fakeEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0px", justifyContent: "space-around" }}>
      <button type="button" onClick={() => handleStep(-1)}>−</button>
      <input
        type="number"
        value={value}
        onChange={onChange}
        {...rest}
        style={{ width: "auto", textAlign: "center" }}
      />
      <button type="button" onClick={() => handleStep(1)}>+</button>
    </div>
  );
};

export default NumberInput;
