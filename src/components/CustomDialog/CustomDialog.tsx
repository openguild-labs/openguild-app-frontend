import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import SearchInput from "../SearchInput/SearchInput";

interface CustomDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, setIsOpen }) => {
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0  w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-sm rounded-xl bg-[#070D0E] p-6 backdrop-blur-2xl text-center">
                  <DialogTitle as="h3" className="text-[42px] font-semibold text-white">
                    ChainCohort
                  </DialogTitle>
                  <p className="text-xl font-semibold text-[#0fdbd1] mb-3">SIGN IN</p>
                  <SearchInput placeholder="name@example.com" />
                  <Button as="button" className="bg-[#0fdbd1] text-black text-md font-bold rounded-lg px-4 py-3 mt-3 w-full">
                    Continue with Email
                  </Button>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="bg-white/10  w-full h-[1px]" />
                    <div className="text-xs text-white/50 w-[100px] shrink-0">or Sign in with</div>

                    <div className="bg-white/10  w-full h-[1px]" />
                  </div>

                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomDialog;
