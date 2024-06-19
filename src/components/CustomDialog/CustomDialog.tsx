import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import SearchInput from "../SearchInput/SearchInput";
import googleImg from "@assets/images/google.webp";
import metamaskImg from "@assets/images/metamask.webp";
import twitterImg from "@assets/images/twitter.webp";
import coinbaseImg from "@assets/images/coinbase.webp";

interface CustomDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, setIsOpen }) => {
  function close() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-50 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
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
                  OpenGuild
                </DialogTitle>
                <p className="text-xl font-semibold text-primary-color mb-3">SIGN IN</p>
                <SearchInput placeholder="name@example.com" />
                <Button as="button" className="bg-primary-color text-black text-md font-bold rounded-lg px-4 py-3 mt-3 w-full">
                  Continue with Email
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <div className="bg-white/10  w-full h-[1px]" />
                  <div className="text-xs text-white/50 w-[100px] shrink-0">or Sign in with</div>
                  <div className="bg-white/10  w-full h-[1px]" />
                </div>
                <div className="text-sm mt-6 mb-4"> Social Account</div>
                <div className="flex justify-between max-w-[270px] mx-auto">
                  {[0, 1, 2, 3].map((_, index) => (
                    <div key={index} className=" rounded-full bg-[#121719] w-10 h-10 flex items-center justify-center">
                      <img src={index % 2 == 0 ? twitterImg : googleImg} alt="ggImg" className="w-6 h-6" />
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-6 mb-4"> Crypto Wallet</div>
                <div className="flex justify-between max-w-[270px] mx-auto mb-8">
                  {[0, 1, 2, 3].map((_, index) => (
                    <div key={index} className=" rounded-full bg-[#121719] w-10 h-10 flex items-center justify-center">
                      <img src={index % 2 == 0 ? coinbaseImg : metamaskImg} alt="ggImg" className="w-6 h-6" />
                    </div>
                  ))}
                </div>{" "}
                <div className="text-xs text-white/50 mb-2">Self-custodial log in by Web3Auth</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;
