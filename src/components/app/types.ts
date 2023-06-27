export type TBurgerData = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
};

export enum BurgerTypes { //eslint-disable-line
    BUN = 'bun', //eslint-disable-line
    MAIN = 'main', //eslint-disable-line
    SAUSES = 'sauce' //eslint-disable-line
};

export type TCategoriesData = {
    items: TBurgerData[],
    type: string,
    title: string
};

export type TCategoriesItem = {
    [key: string]: string
};