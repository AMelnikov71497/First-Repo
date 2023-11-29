import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import { searchBy } from '../../redux/Slices/serchSlice';
import { selectCard } from '../../redux/Slices/cartSlice';
import { searchValueSelect } from '../../redux/Slices/serchSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Header: React.FC = () => {
    const dispatch = useDispatch()

    const inputRef = React.useRef<HTMLInputElement>(null)

    const { totalPrice, items } = useSelector(selectCard)

    const { searchValue } = useSelector(searchValueSelect)

    //При клике очищаю инпут, сохранят эти данные в редаксе, делаю инпут в состоянии focus
    const inputClear = () => {

        dispatch(searchBy(''))

        if(inputRef.current) {
            inputRef.current.focus()
        }
    }
        
    //По событию change забераю данные из инпута, сохраняю их в редакс
    const inputChange = (inputValue: string) => {
        
        dispatch(searchBy(inputValue))
    }

    const { pathname } = useLocation()

    return (
        <header className='header'>
            <div className='header__headerBlockLogo'>
                <Link className='header__headerLogo' to='/'>
                    <img className='header__logo' src='./img/shawarmaLogo.png' alt='shawarmaLogo'/>
                    <span className='header__logoText'>SHOP SHAWERMA</span>
                </Link>
                
            </div>
            <div className='header__blockInputSearch'>
                <input className='header__inputSearch' value={searchValue} ref={inputRef} onChange={(event)=>inputChange(event.target.value)} placeholder='Введите данные для поиска'/>
                <button className='header__btnSearchClose' onClick={inputClear}>
                <img src="./img/btnSearchClose.png" alt='btnSearchClose'/>
                </button>
            </div>
            {
                pathname !== '/card' && 
                <Link className='header__headerBasket' to='/card'>
                <span>{totalPrice}</span>
                <div className='header__basketBlockIcons'>
                    <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        
                <span>{items.reduce((acc:number, obj:any) => obj.count + acc,0)}</span>
                </div>
                </Link>
            }
           

        </header>

    )
}