import React from 'react';
import './sort.scss';

type ISortProperties = {
    name: string,
    sortProperty: string
}

type ISortProps = {
    activeSortBy: ISortProperties,
    dispatchSortType: (obj: ISortProperties) => void
}

export const Sort: React.FC <ISortProps> = ({ activeSortBy, dispatchSortType }) => {


const [state, setState] = React.useState<boolean>(false);

type SortItem = {
    name: string,
    sortProperty: string
  }
    
    const sort: SortItem[] = [
      {
        name: "популярности",
        sortProperty: "rating"
      },
      {
        name: "цене",
        sortProperty: "price"
      },
      {
        name: "алфавиту",
        sortProperty: "name"
      }
    ]

let sortHeader = sort.find((obj) => obj.sortProperty === activeSortBy.sortProperty)

    return (
        <div className='sort' onClick={()=>{setState(!state)}}>
            
            <span className='sort__sortSpanFirst'>
            <svg width="20" height="15" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.960925 1.71657C0.957837 1.54733 1.017 1.39974 1.13842 1.27381C1.25985 1.14787 1.40518 1.08336 1.57442 1.08027L10.323 0.920648C10.4922 0.91756 10.6398 0.976726 10.7657 1.09815C10.8917 1.21957 10.9562 1.3649 10.9593 1.53414C10.9623 1.70338 10.9032 1.85097 10.7818 1.97691L6.4873 6.43099C6.36588 6.55693 6.22055 6.62144 6.05131 6.62453C5.88207 6.62761 5.73448 6.56845 5.60854 6.44703L1.15446 2.15257C1.02852 2.03115 0.964013 1.88582 0.960925 1.71657Z" fill="#2C2C2C"/>
            </svg>
                Сортировать по:
            </span>
            <span className='sort__sortSpanSecond'>{

            sortHeader &&  sortHeader.name
           
            }</span>

            { state &&(
            <ul className='sort__sortPopap'>

                {
                    sort.map((obj) => (
                       
                        <li onClick={()=>{dispatchSortType(obj)}} className={obj.sortProperty === activeSortBy.sortProperty?"active":''}>{obj.name}</li>
                       
                    ))
                }
               
            </ul>
            )}
            
        </div>
    )
}