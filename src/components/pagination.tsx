import React, { useState } from "react";
import "datagrids/style.scss";

const pagination = (props: any) => {
  const {pageSize, pageIndex, onPageSizeChanged, onLastPage, onNextPage, total} = props;
  return (
    <div className="grid-bottom">
      <div>
        <span style={{marginRight: "10px"}}>Rows per page :</span> 
        <select
          value={pageSize}
          onChange={onPageSizeChanged}
          className="page-size"
        >
          <option value="10" >10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div style={{alignSelf: "center"}}>
        <span style={{marginLeft:"20px"}}>{pageIndex * pageSize + 1}-{(pageIndex + 1) * pageSize} of {total}</span>
        <button className="page-last" onClick = {onLastPage}>
          {"<"}
        </button>
        <button className="page-next" onClick = {onNextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default pagination;