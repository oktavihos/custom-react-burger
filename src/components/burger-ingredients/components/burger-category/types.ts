import React from "react";

export type TBurgerCategoryProps = {
    title: string,
    type: string,
    children?: React.ReactElement[],
    titleRef?: React.LegacyRef<HTMLHeadingElement>
};