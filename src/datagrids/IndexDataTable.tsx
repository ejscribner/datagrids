import React, { useCallback, useMemo, useState } from 'react';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import indexData from './data/indexStatus.json';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

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

  // @ts-ignore
  const onCellClicked = (params) => {
    if (params.column.colId === 'delete') {
      params.api.applyTransaction({
        remove: [params.node.data],
      });
    }
  };

  const [columnDefs] = useState([
    { field: 'indexName', headerName: 'Index Name', width: 150 },
    { field: 'status', headerName: 'Status', cellRenderer: StatusColumnRenderer },
    { field: 'reqSec', headerName: 'Requests/Sec' },
    { field: 'residentRatio', headerName: 'Resident Ratio' },
    { field: 'items', headerName: 'Items', width: 100 },
    { field: 'dataSize', headerName: 'Data Size' },
    { field: 'bucket', headerName: 'Bucket' },
    { field: 'scope', headerName: 'Scope' },
    { field: 'collection', headerName: 'Collection' },
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
      <div className="ag-theme-alpine h-full w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination
          paginationPageSize={10}
          onCellClicked={onCellClicked}
          onGridSizeChanged={(e) => (e.clientWidth > 1024 ? e.api.sizeColumnsToFit() : null)}
        />
      </div>
    </div>
  );
}

export default IndexDataTable;
