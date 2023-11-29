import React from 'react';
import { Link } from 'react-router-dom';
import './OrderBlock.scss';


type IOrderBlockProps = {
    items: any[],
    totalPrice: number
}

export const OrderBlock: React.FC <IOrderBlockProps> = ({items, totalPrice}) => {
    const countItemsTotal = items.reduce((acc, obj) => obj.count + acc,0)
    return (
        <div className='orderBlock'>
            <div className='orderBlock__totalShawermas'>
                <span className='orderBlock__totalCount'>Всего шаверм: {countItemsTotal}.шт</span>
                <Link className='orderBlock__linkLast' to='/'>Вернуться назад</Link>
            </div>
            
            <div className='orderBlock__tatalPrice'>
                <span className='orderBlock__price'>Сумма заказа: {totalPrice}</span>
                <Link className='orderBlock__payNow' to="#">Оплатить</Link>
            </div>

        </div>
    )
}