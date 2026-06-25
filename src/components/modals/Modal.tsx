import { ReactNode, useEffect } from "react";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-500 ${isOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`${isOpen ? "opacity-100 " : "opacity-0"} absolute inset-0 bg-black/30 transition-all duration-500`}
        onClick={onClose}
      />

      {/* modal */}
      <div
        className={`relative z-10 w-full  max-w-lg rounded-2xl bg-white shadow-2xl transform transition-all duration-500  ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            arian-label="Close Modal"
            onClick={onClose}
          >
            <LuX size={18} />
          </button>
        </div>

        {/* content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
