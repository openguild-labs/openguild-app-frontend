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
            "transition-effect h-[50px] block w-full rounded-lg outline-0 border border-neutral-700 text-sm text-white bg-black py-3 px-4 data-[hover]:border-[#0fdbd1] data-[selected]:border-[#0fdbd1]",
            className
          )}
        />
      </Field>
    </div>
  );
}
