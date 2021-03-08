import React from "react";
import style from "./PaginatorAntd.module.css";
import { Pagination } from 'antd';

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  portionSize?: number,
  onChangePageSize:(pageSize:number)=>void
}

const PaginatorAntd:React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize=10,onChangePageSize}) => {
  return (
    <>
    
      <Pagination className={style.paginator} responsive={true} current={currentPage} defaultCurrent={1} total={totalItemsCount} pageSize={pageSize}
        onChange={e=>onPageChanged(e)}
        // onShowSizeChange={(current,size)=>console.log(current,size)}
        onShowSizeChange={(current,size)=>onChangePageSize(size)}
      />
    </>
  );
};

export default PaginatorAntd;
