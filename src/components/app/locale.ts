import { BurgerTypes, TCategoriesItem } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const locCategories: TCategoriesItem = {
    [BurgerTypes.BUN.toString()]: 'Булки',
    [BurgerTypes.SAUSES.toString()]: 'Соусы',
    [BurgerTypes.MAIN.toString()]: 'Начинки'
};