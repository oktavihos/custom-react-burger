
import React, { useCallback, useEffect} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModalProps } from "./types";
import ModalOverlay from "./components/modal-overlay";
import modalStyle from "./style.module.sass";

const Modal: React.FC<TModalProps> = ({title = "", children, closeModalHandle = () => null, extraClass}) => {
    const modalRoot = document.querySelector("#modals");

    const handleEscapePress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModalHandle();
        }
    }, [closeModalHandle]);

    useEffect(() => {
        document.addEventListener("keydown", handleEscapePress);
        return () => document.removeEventListener("keydown", handleEscapePress);
    }, [handleEscapePress])

    return modalRoot && createPortal(
        <ModalOverlay closeModalHandle={closeModalHandle}>
            <div className={`${modalStyle.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={`${modalStyle.modalHeader}`}>
                    <span className="text text_type_main-large">{title}</span>
                    <span className={modalStyle.close}><CloseIcon onClick={() => closeModalHandle()} type="primary" /></span>
                </div>
                <div className={`${extraClass ? ` ${extraClass}` : ""}`}>{children}</div>
            </div>
        </ModalOverlay>
    , modalRoot)
}

export default Modal;