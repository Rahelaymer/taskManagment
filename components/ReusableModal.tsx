import React from "react";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ReusableModal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed w-full py-5 flex inset-0 justify-center  items-center z-50 transition-colors ${
        open ? " visible bg-black/50" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` relative w-full sm:w-auto max-h-[95vh] bg-white overflow-hidden p-8 rounded-lg  my-6  sm:mt sm:my-6  sm:max-w-[55vw]    flex flex-row items-center justify-center  border-gray-400 transition-all${
          open ? " opacity-100 scale-100" : "scale-125 opacity-0 "
        }`}
      >
        <div>
          <button
            onClick={onClose}
            className="absolute right-3  top-3 flex justify-center items-center text-2xl text-gray-900 p-1 rounded-lg hover:text-gray-800    hover:bg-slate-200"
          >
            <RxCross1 />
          </button>
        </div>
        <div className="overflow-y-scroll max-h-[95vh] w-full scrollbar-hidden mx-6 py-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
