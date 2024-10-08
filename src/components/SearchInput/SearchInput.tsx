import { Field, Input, InputProps } from "@headlessui/react";
import clsx from "clsx";

interface TSearchInputProps extends InputProps {
  isActive?: boolean;
  icon?: React.ReactNode;
}

export default function SearchInput({ isActive = false, className, icon, ...props }: TSearchInputProps) {
  return (
    <div className="w-full relative">
      <Field>
        <Input
          {...props}
          className={clsx(
            "transition-effect h-[50px] block w-full rounded-lg outline-0 border text-sm text-black bg-white py-3 px-4 data-[hover]:border-primary-color data-[selected]:border-primary-color",
            className
          )}
          style={{
            borderColor: isActive ? "#6b3ffd" : "#d1d5db",
            paddingLeft: icon ? "44px" : "16px",
          }}
        />
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{
            color: isActive ? "#6b3ffd" : "#d1d5db",
          }}
        >
          {icon}
        </div>
      </Field>
    </div>
  );
}
