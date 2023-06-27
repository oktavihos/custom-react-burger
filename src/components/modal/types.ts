import React from "react";

export type TModalProps = {
    children?: React.ReactElement | React.ReactElement[],
    title?: string,
    closeModalHandle?: () => void,
    extraClass?: string
};