import React, { useCallback, useMemo, useState, useEffect } from 'react';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import indexData from './data/indexStatus.json';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import './style.scss';

fontawesome.library.add(faTrashCan as IconDefinition, faCircle as IconDefinition); // Optional theme CSS

function DeleteButtonRenderer(props: any) {
  return (
    <button onClick={props.onClick}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

function StatusColumnRenderer(props: any) {
  return (
    <div>
      <span className="pr-2 text-xs" style={{ color: 'rgb(75, 174, 62)' }}>
        <FontAwesomeIcon icon={faCircle} />
      </span>
      {props.data.status}
    </div>
  );
}


function IndexDataTable() {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      unSortIcon: true,
      width: 120,
    };
  }, []);

  const [rowData, setRowData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  // @ts-ignore
  useEffect(() => {
    //change page size
  }, [pageSize]);
  useEffect(() => {
    //change page
  }, [pageIndex]);

  const onNextPage = () => {
    //next page
    const index = pageIndex + 1;
    const pageMax = Math.floor(rowData.length/pageSize)
    index > pageMax ? setPageIndex(pageMax) : setPageIndex(index);
    
  }
  
  const onLastPage = () => {
    //previous page
    const index = pageIndex - 1;
    index < 0 ? setPageIndex(0) : setPageIndex(index);
  }
  
  const onPageSizeChanged = (e: any) => {
    // page size
    setPageSize(e.target.value);
  }


  const onCellClicked = (params: any) => {
    if (params.column.colId === 'delete') {
      params.api.applyTransaction({
        remove: [params.node.data],
      });
    }
  };
  const [columnDefs] = useState([
    { field: 'indexName', headerName: 'INDEX NAME', width: 150, cellStyle: {fontWeight: 'bold'}},
    { field: 'status', headerName: 'STATUS', cellRenderer: StatusColumnRenderer },
    { field: 'reqSec', headerName: 'REQUEST/SEC', width: 150},
    { field: 'residentRatio', headerName: 'RESIDENT RATIO', width: 150},
    { field: 'items', headerName: 'ITEMS', width: 100 },
    { field: 'dataSize', headerName: 'DATA SIZE' },
    { field: 'bucket', headerName: 'BUCKET' },
    { field: 'scope', headerName: 'SCOPE' },
    { field: 'collection', headerName: 'COLLECTION' },
    { field: 'delete', headerName: '', sortable: false, cellRenderer: DeleteButtonRenderer, width: 52 },
  ]);

  const onGridReady = useCallback(() => {
    const fetchedRowData = indexData.indexes.map((index) => {
      return {
        indexName: index.index,
        status: index.status,
        reqSec: '0',
        residentRatio: '100%',
        items: Math.floor(Math.random() * 10000 - 216 + 1) + 216,
        dataSize: `${Math.floor(Math.random() * 999 - 10 + 1) + 10} KiB`,
        bucket: index.bucket,
        scope: index.scope,
        collection: index.collection,
      };
    });
    // @ts-ignore
    setRowData(fetchedRowData);
  }, []);

  return (
    // IMPT: requires height and width for some reason?
    <div className="mx-auto" style={{ height: '40vh' }}>
      <div className="ag-theme-custom h-full w-full">
        <div className='header'>
          <div className="header-title">Indexes</div>
        </div>
        <div className="grid-header">
          {pageIndex * pageSize + 1}-{(pageIndex + 1) * pageSize} of {rowData.length} shown
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellClicked={onCellClicked}
          onGridSizeChanged={(e) => (e.clientWidth > 1024 ? e.api.sizeColumnsToFit() : null)}
        />
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
            <span style={{marginLeft:"20px"}}>{pageIndex * pageSize + 1}-{(pageIndex + 1) * pageSize} of {rowData.length}</span>
            <button className="page-last" onClick = {onLastPage}>
              {"<"}
            </button>
            <button className="page-next" onClick = {onNextPage}>
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexDataTable;
