import React from "react";
import { TModalOverlayProps } from "./types";
import overlayStyle from "./style.module.sass";

const ModalOverlay: React.FC<TModalOverlayProps> = ({children, closeModalHandle = () => null}) => {

    const clickHandle: React.MouseEventHandler<HTMLDivElement> = e => {
        if(e.target === e.currentTarget) closeModalHandle();
    }

    return (
        <div onClick={clickHandle} className={overlayStyle.modalOverlay} aria-hidden="true">
            {children}
        </div>
    );
}

export default ModalOverlay;