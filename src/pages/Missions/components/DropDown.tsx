import MenuButton from "@/components/MenuButton";
import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";

interface IDropDownProps {
  value: string;
  onChange: (value: string) => void;
  options: TOptions[];
}

function DropDown({ options, value, onChange }: IDropDownProps) {
  return (
    <Menu>
      <MenuButton label={value} />
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-52 bg-white origin-top-right rounded-xl border border-neutral-700 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.value}>
                <button
                  onClick={() => {
                    onChange(option.value);
                  }}
                  className="group flex w-full items-center gap-2 rounded-lg py-3 px-4 data-[focus]:bg-primary-color/10"
                  style={{
                    backgroundColor: value === option.value ? "rgba(220,220,220,0.46)" : "transparent",
                    color: value === option.value ? "#6b3ffd" : "inherit",
                  }}
                >
                  {option.label}
                </button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default DropDown;
