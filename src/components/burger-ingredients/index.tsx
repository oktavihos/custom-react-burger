import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerIngridientsProps } from './types';
import BurgerCategory from './components/burger-category';
import BurgerElement from './components/burger-element';
import ingridientsStyle from './style.module.sass';
import { locCategories } from '../app/locale';
import { BurgerTypes, TBurgerData, TCategoriesData } from '../app/types';
import IngredientsDetail from './components/ingredients-detail';

const BurgerIngredients: React.FC<TBurgerIngridientsProps> = ({data = []}) => {

    const [current, setCurrent] = useState<string>(BurgerTypes.BUN);
    const observer = useRef<IntersectionObserver | null>(null);
    const titleRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const [selectData, setSelectData] = useState<TBurgerData|null>(null);

    useEffect(() => {
        const root = document.getElementById('scroll-sections');

        observer.current = new IntersectionObserver(entries => {
            const visibleSection = entries.find(entry => entry.isIntersecting)?.target;
            if(visibleSection) setCurrent(visibleSection.id);
        }, {root, rootMargin: '0px 0px -90% 0px', threshold: 0});

        const sections = root?.querySelectorAll('h2');
        if(sections) sections.forEach(section => observer.current?.observe(section));

        return () => {
            if(sections) sections.forEach((section) => {
              observer.current?.unobserve(section);
            });
        };

    }, []);

    const closeModalHandle = useCallback(() => {
        setSelectData(null);
    }, [setSelectData]);

    const selectHandle = useCallback((dataSet: TBurgerData) => {
        setSelectData(dataSet);
    }, [setSelectData]);

    const categoriesData: TCategoriesData[] = useMemo(() => {
        const result: TCategoriesData[] = [];
        Object.keys(locCategories).forEach(type => {
            const categoryTitle = locCategories[type];
            result.push({
                title: categoryTitle, type,
                items: data.filter(item => item.type === type)
            });
        });
        return result;
    }, [data]);

    

    const setRefs = (ref: HTMLHeadingElement | null, index: number) => {
        titleRef.current[index] = ref;
    }

    const handleScroll = (index: number) => {
        titleRef.current[index]?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            {selectData && <IngredientsDetail data={selectData} closeModalHandle={closeModalHandle} />}
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={`${ingridientsStyle.tabIngridients} mb-10`}>
                {Object.keys(locCategories).map((type, index) => 
                    <Tab key={type} value={type} active={current === type} onClick={() => handleScroll(index)}>
                        {locCategories[type]}
                    </Tab>
                )}
            </div>
            <div id="scroll-sections" className="scroll mb-10">
                {categoriesData.map((categoryData, index) => 
                    <BurgerCategory titleRef={(ref) => setRefs(ref, index)} key={categoryData.type} title={categoryData.title} type={categoryData.type}>
                        {/* eslint-disable-next-line no-underscore-dangle */}
                        {categoryData.items.map(item => <BurgerElement selectHandle={selectHandle} key={item._id} data={item} />)}
                    </BurgerCategory>
                )}
            </div>
        </>
    );
}

export default BurgerIngredients;