"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, forwardRef, ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: string;
  type?: string;
  onChange?: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, name, value, placeholder, errors, type = "text", onChange, onBlur, onKeyDown }, ref) => {
    const [inputType, setInputType] = useState(type);
    const [password, setPassword] = useState(false);

    const handleIconClick = () => {
      setInputType(password ? "password" : "text");
      setPassword((prev) => !prev);
    };

    return (
      <div className="relative grid gap-2">
        {label && (
          <label htmlFor={id} className="text-white text-sm">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            className={clsx(
              "w-full h-[50px] ring-1 ring-inset px-4 ring-gray03 rounded-xl placeholder-gray04 text-gray06 text-base transition-all duration-300 ease-in-out focus-within:ring-purple01 focus-within:ring-2",
              errors ? "ring-red01 focus-within:ring-red01" : "focus-within:ring-purple01",
            )}
            id={id}
            name={name}
            value={value}
            type={inputType}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
          />
          {type === "password" && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleIconClick}>
              {password ? (
                <Image src="/icons/eye-on.svg" width={16} height={16} alt="OpenEyes" />
              ) : (
                <Image src="/icons/eye-off.svg" width={16} height={16} alt="OpenEyes" />
              )}
            </span>
          )}
        </div>

        {errors && <span className="pl-1 text-sm font-normal text-red01">{errors}</span>}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
