import React  from 'react';
import './Pagination.css';

const Pagination = ({postperPage, totalPost, paginate, number})=>{
    const pageNumber =[];
    for (let i =1; i <= Math.ceil(totalPost/postperPage); i++) {
        pageNumber.push(i);
    }
    
    return(
        <nav className="Pagination-nav">
        <ul className="Pagination-ul">
            {pageNumber.map((item)=>{
                return (<li key={item}  className={ number===item ? 'active' : '' }>
                     <a  onClick={()=> paginate(item)} href="!#" >{item}</a>
                </li>)
            })}
        </ul>
        </nav>
    )
}

export default Pagination;