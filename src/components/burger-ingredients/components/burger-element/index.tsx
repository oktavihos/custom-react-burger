import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerElementProps } from "./types";
import elementStyle from "./style.module.sass";

const BurgerElement: React.FC<TBurgerElementProps> = React.memo(({data, selectHandle = () => null}: TBurgerElementProps) => (
        <div className={`${elementStyle.card}`} onClick={() => selectHandle(data)} aria-hidden="true">
            <Counter count={1} size="default" extraClass="m-1" />
            <div className="pl-4 pr-4"><img alt={data.name} src={data.image} /></div>
            <div className={`${elementStyle.price} mt-1 mb-1`}>
                <span className="text text_type_digits-default">{data.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={elementStyle.name}>{data.name}</div>
        </div>
    )
);

export default BurgerElement;