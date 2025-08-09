import React, { forwardRef } from "react";
import CloseIcon from "./icons/close-icon";

type ModalProps = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ title, onClose, children }, ref) => {
    return (
        <dialog ref={ref} className="modal" onClose={onClose}>
            <div className="modal-box">
                <form method="dialog" className="absolute right-2 top-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </button>
                </form>

                {title && <h3 className="font-bold text-lg">{title}</h3>}
                <div className="py-4">{children}</div>
            </div>
        </dialog>
    );
});

Modal.displayName = "Modal";
export default Modal;
