import React from 'react';
import './Categories.css';

interface ICategoriesProps {
    activeCategory: null | number,
    dispatchCategoryFn: (index: number | null) => void
}

export const Categories: React.FC <ICategoriesProps> = ({activeCategory, dispatchCategoryFn}) => {
    const categories: string[] = ['С курицей', 'Сырная', 'По корейски', 'Вегетарианская', 'Грибная', 'Острая', 'Фитнес', 'По японски']
    return (
        <ul className='categoriesList'>
            <li onClick={()=>dispatchCategoryFn(null)} className={activeCategory === null?'active': ''}>Все</li>
            {
                categories.map((item, index) => (
                    <li className={activeCategory === index?'active': ''} onClick={()=>{dispatchCategoryFn(index)}} key={index}>
                      {item}
                    </li>
                ))
            }
           
        </ul>
    )
}