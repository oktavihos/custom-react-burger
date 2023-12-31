import React, { useCallback, useMemo, useState } from "react";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerConstructorProps } from "./types";
import { BurgerTypes, TBurgerData } from "../app/types";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";

const BurgerConstructor: React.FC<TBurgerConstructorProps> = ({data = []}) => {

    const [bun, other, sum] = useMemo<[TBurgerData | null, TBurgerData[], number]>(() => {
        let calcBun: TBurgerData | null = null;
        const calcOther: TBurgerData[] = [];
        let calcSum = 0;

        data.forEach(item => {
            if(item.type === BurgerTypes.BUN) calcBun = item;
            else calcOther.push(item);
            calcSum += item.price;
        });

        return [calcBun, calcOther, calcSum];
    }, [JSON.stringify(data)]); // eslint-disable-line react-hooks/exhaustive-deps

    const [open, setOpen] = useState(false);

    const closeModalHandle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <>
            {open && <OrderDetails closeModalHandle={closeModalHandle} />}
            <div className={`${constructorStyle.currentList} mb-25`}>
                {bun && <ConstructorElement
                    extraClass="ml-7"
                    type="top"
                    isLocked
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
                <div className={`${constructorStyle.scrollList} scroll scroll-view`}>
                    {other.map((item, index) => 
                        (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index} className={constructorStyle.dragItem}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    extraClass="ml-1"
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </div>
                        )
                    )}
                </div>
                {bun && <ConstructorElement
                    extraClass="ml-7"
                    type="bottom"
                    isLocked
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
            </div>
            <div className={constructorStyle.total}>
                <span className={`${constructorStyle.price} text text_type_digits-medium`}>{sum}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={() => setOpen(true)} extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;