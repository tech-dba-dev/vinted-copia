"use client";

import { useState } from "react";

export function PasswordInput({
  name,
  placeholder,
  className,
}: {
  name: string;
  placeholder?: string;
  className?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-stretch">
      <input
        className={
          className ??
          "form-input flex w-full rounded-xl text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] px-4 pr-12 text-base font-normal"
        }
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        name={name}
        required
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#61896f] hover:text-primary transition-colors"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <span className="material-symbols-outlined">
          {showPassword ? "visibility_off" : "visibility"}
        </span>
      </button>
    </div>
  );
}
