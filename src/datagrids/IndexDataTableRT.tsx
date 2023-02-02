import React, { useCallback, useMemo, useState } from 'react';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import { useTable } from 'react-table';
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

function IndexDataTableRT() {
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

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'put',
        col2: 'stuff',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    // IMPT: requires height and width for some reason?
    <div className="mx-auto" style={{ height: '40vh' }}>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default IndexDataTableRT;
