import React from 'react';
import { Link } from 'react-router-dom';
import { addedCountSelect } from '../../redux/Slices/cartSlice';
import './CardProduct.scss';

import { useSelector } from 'react-redux';


type IobjToCard = {
    id: string,
    imageUrl: string,
    name: string,
    type: string ,
    price: number,
    
}

type ICardProductProps = {
    id: string,
    imageUrl: string,
    name: string,
    type: string[],
    price: number,
    onClickAddShawermas: (obj: IobjToCard) => void
}

export const CardProduct: React.FC <ICardProductProps> = ({ id, imageUrl, name, type, price, onClickAddShawermas}) => {
   
    const [stateType, setStateType] = React.useState(0);

    const addedCount = useSelector(addedCountSelect(id))

    const stateTypeFn = (index:number) => {
        setStateType(index)
    }

    const addShawermas = () => {
        let obj = {
            id,
            imageUrl,
            name,
            type: type[stateType],
            price,
            count: 0
        }
        onClickAddShawermas(obj)
    }

    return (
        <div className='boxCardProduct'>
            <Link to={`shawerma/${id}`}>
            <div className='boxCardProduct__boxImg'>
                <img className='boxCardProduct__imgShawerma' src={imageUrl} alt='shaurmaChiken' />
            </div>
            </Link>
           
            <h3 className='boxCardProduct__titleShawerma'>{name}</h3>
            <ul className='boxCardProduct__sizeShawerma'>
                {
                    type.map((item, index) => (
                        <li onClick={()=>{stateTypeFn(index)}} className={stateType === index?"acviteLiType":''}>{item}</li>
                    ))
                }
            </ul>
            <div className='boxCardProduct__priceAndBtnAddShawerma'>
                <span className='boxCardProduct__priceShawerma'>от {price} руб</span>
                <button className='boxCardProduct__btnAddShawermaToBasket' onClick={addShawermas}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E"/>
                </svg>
                Добавить
                {
                    addedCount && <span className='boxCardProduct__spanAddCart'>{addedCount.count}</span>
                }
                
                </button>
            </div>
        </div>
    )
}