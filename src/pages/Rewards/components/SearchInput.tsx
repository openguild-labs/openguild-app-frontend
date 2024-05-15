import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

export default function SearchInput() {
  return (
    <div className="w-full ">
      <Field>
        <Input
          placeholder="Search by reward, community, badge ..."
          className={clsx(
            "block w-full h-[50px] px-4 rounded-lg border-none bg-white/5 py-1.5  text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
        />
      </Field>
    </div>
  );
}
