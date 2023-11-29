import React from 'react';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import ContentLoader from "react-content-loader"

import { Categories } from '../Components/Categories/Categories';
import { Sort } from '../Components/Sort/Sort';
import { CardProduct } from '../Components/CardProduct/CardProduct';
//import styleApp from '../App.module.css';
import '../App.scss'


import { useDispatch, useSelector } from 'react-redux';

import { fetchShawermas } from '../redux/Slices/shawermaSlice';

import { addProduct } from '../redux/Slices/cartSlice';

import { loadingShawermaSliceSelect } from '../redux/Slices/shawermaSlice';

import { filterAndSortSliceSelect } from '../redux/Slices/filterAndSortSlice';

import { setCategoryBy, setSortBy } from '../redux/Slices/filterAndSortSlice'; 

const SkeletonCard = () => {
  return (
      <ContentLoader 
      speed={2}
      width={330}
      height={386}
      viewBox="0 0 330 386"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      
    >
      <rect x="-133" y="-54" rx="0" ry="0" width="120" height="85" /> 
      <rect x="-1" y="3" rx="0" ry="0" width="330" height="220" /> 
      <rect x="0" y="232" rx="0" ry="0" width="242" height="34" /> 
      <rect x="2" y="275" rx="0" ry="0" width="329" height="62" /> 
      <rect x="2" y="353" rx="0" ry="0" width="128" height="26" /> 
      <rect x="165" y="347" rx="18" ry="18" width="163" height="34" />
    </ContentLoader>
    )
}

export const Home: React.FC = () => {
  
  type SortItem = {
    name: string,
    sortProperty: string
  }

    const { items, status } = useSelector(loadingShawermaSliceSelect)
    
    const navigate = useNavigate()
    
  
    //Здесь мы уже получаем изменённое состояние категории и сортировки
    const { category, sortBy } = useSelector(filterAndSortSliceSelect)

    const { searchValue } = useSelector(({searchSlice}) => searchSlice)

    const dispatch = useDispatch()

    //Отправили в redux индекс категории которую выбрали
    const dispatchCategoryFn = (index: number | null) => {
          dispatch(setCategoryBy(index))
    }

    //Отправили в redux type сортировки которую выбрали
    const dispatchSortType = (obj: SortItem) => {
          dispatch(setSortBy(obj))
    }

    //Отправляем запрос на сервер и сохраняем их в редакс

    React.useEffect(() => {

     dispatch(
      //@ts-ignore
      fetchShawermas({category, sortBy, searchValue}))
   
  }, [category, sortBy, searchValue]);


  React.useEffect(() => {
    const queryString = qs.stringify({
      sortBy: sortBy.sortProperty,
      category
    })
    navigate(`?${queryString}`)
  }, [category, sortBy])


  type ObjToCard = {
    id: string
    imageUrl: string
    name: string
    type: string,
    price: number,
    count: number
  }

  const addShawermasToCartFn = (obj: ObjToCard) => {
      dispatch(addProduct(obj))
  }

    return (
        <>
        <div className='categoriesAndSort'>
        <Categories activeCategory={category} dispatchCategoryFn={dispatchCategoryFn}/>
        <Sort activeSortBy={sortBy} dispatchSortType={dispatchSortType}/>
      </div>
      <div className='cardsProduct'>
        { status === "success" ? items.map((obj: any) => <CardProduct key={obj.id} {...obj} onClickAddShawermas={addShawermasToCartFn} />) :
          Array(10).fill(<SkeletonCard />)   
        }
       
      </div>

        </>
    )

}


