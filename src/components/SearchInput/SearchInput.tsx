import { Field, Input, InputProps } from "@headlessui/react";
import clsx from "clsx";

interface TSearchInputProps extends InputProps {}

export default function SearchInput({ className, ...props }: TSearchInputProps) {
  return (
    <div className="w-full ">
      <Field>
        <Input
          {...props}
          className={clsx(
            "transition-effect h-[50px] block w-full rounded-lg outline-0 border border-gray-300 text-sm text-black bg-white py-3 px-4 data-[hover]:border-primary-color data-[selected]:border-primary-color",
            className,
          )}
        />
      </Field>
    </div>
  );
}
