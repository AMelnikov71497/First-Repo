import React from 'react';
import './CartItem.scss';


type ICardItemProps = {
    id: string,
    imageUrl: string,
    name: string,
    type: string,
    price: number,
    count: number,
    addProductCountCart: (id: string) => void,
    minusProductCountCart: (id: string) => void,
    removeItemFn: (id: string, name: string) => void
}
export const CartItem: React.FC <ICardItemProps>  = ({id, imageUrl, name, type, price, count, addProductCountCart, minusProductCountCart, removeItemFn}) => {
    const removeItemIdFn = () => {
      
            removeItemFn(id, name)

    }
    return (
        <div className="cartItem">
            <div className='cartItem__blockImg'>
                <img className='cartItem__img' src={imageUrl} alt='cartItem__img' />
            </div>
            <h4 className='cartItem__title'>{name}</h4>
            <span className='cartItem__type'>{type}</span>
            <span className='cartItem__price'>{price * count}.руб</span>
            <div className='cartItem__blockCount'>
                <button className='cartItem__btnMinusItem' onClick={()=>minusProductCountCart(id)}>-</button>
                <span className='cartItem__spanCount'>{count}</span>
                <button className='cartItem__btnPlusItem' onClick={()=>addProductCountCart(id)}>+</button>
            </div>
            <button className='cartItem__btnDelete' onClick={removeItemIdFn}>Удалить</button>
        </div>
    )
}

