import React, { useCallback, useMemo, useState } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { faCircle, faCircleUser, faEllipsisV, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import importData from './data/importData.json';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

fontawesome.library.add(faEllipsisV, faCircle, faCircleUser, faSpinner); // Optional theme CSS

function BucketColumnRenderer(props: any) {
  return (
    <div>
      <span className="font-bold">{props.data.bucket}</span>
    </div>
  );
}

function StatusColumnRenderer(props: any) {
  const { status } = props.data;
  const statusMap = {
    completed: 'Completed',
    loading: 'Loading',
    waiting_file_upload: 'Awaiting File Upload',
  };

  return (
    <div>
      {
        {
          completed: (
            <span className="pr-2 text-xs" style={{ color: 'rgb(75, 174, 62)' }}>
              <FontAwesomeIcon icon={faCircle} />
            </span>
          ),
          loading: (
            <span className="pr-2" style={{ color: 'rgb(66,135,214)' }}>
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          ),
          waiting_file_upload: (
            <span className="pr-2 text-xs" style={{ color: 'rgb(252,171,48)' }}>
              <FontAwesomeIcon icon={faCircle} />
            </span>
          ),
        }[status]
      }
      {statusMap[status]}
    </div>
  );
}

function ImportedByColumnRenderer(props: any) {
  return (
    <div className="flex">
      <span className="pr-2 text-3xl" style={{ color: 'rgb(161,161,161)' }}>
        <FontAwesomeIcon icon={faCircleUser} />
      </span>
      {props.data.importedBy}
    </div>
  );
}

function ImportedOnColumnRenderer(props: any) {
  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  }

  const date = props.data.importedOn;
  return (
    <div className="flex flex-col">
      <span className="-mb-2">{date.toDateString()}</span>
      <span className="text-xs font-light">{timeSince(date)}</span>
    </div>
  );
}

function ImportFileColumnRenderer(props: any) {
  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div className="flex flex-col">
      <span className="-mb-2">{props.data.importFile.name}</span>
      <span className="text-xs font-light">{formatBytes(props.data.importFile.size, 2)}</span>
    </div>
  );
}

function KebabButtonRenderer(props: any) {
  return (
    <button onClick={props.onClick}>
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
}

function ImportDataTable() {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      unSortIcon: true,
      width: 250,
    };
  }, []);

  const [rowData, setRowData] = useState([
    //  TODO: need to load this from file going forward
    //   TODO: need complex types for this importedON and importFile
    {
      bucket: 'projects',
      status: 'Completed',
      importedBy: 'Aaron LaBeau',
      importedOn: new Date(),
      importFile: { name: 'sample-data.json', size: '15.2 KB' },
    },
  ]);

  const onCellClicked = (params) => {
    if (params.column.colId === 'flyout') {
      console.log('open flyout menu');
    }
  };

  const [columnDefs] = useState([
    { field: 'bucket', headerName: 'Bucket', cellRenderer: BucketColumnRenderer, width: 180 },
    { field: 'status', headerName: 'Status', cellRenderer: StatusColumnRenderer, width: 200 },
    { field: 'importedBy', headerName: 'Imported By', cellRenderer: ImportedByColumnRenderer },
    { field: 'importedOn', headerName: 'Imported On', cellRenderer: ImportedOnColumnRenderer },
    { field: 'importFile', headerName: 'Import File', cellRenderer: ImportFileColumnRenderer, width: 180 },
    { field: 'flyout', headerName: '', sortable: false, cellRenderer: KebabButtonRenderer, width: 52 },
  ]);

  const onGridReady = useCallback(() => {
    const fetchedRowData = importData.data.map((entry) => {
      return {
        bucket: entry.data.bucket,
        status: entry.data.status,
        importedBy: entry.data.createdByUserName,
        importedOn: new Date(entry.data.createdAt),
        importFile: { name: entry.data.fileName, size: entry.data.fileSize },
      };
    });
    // @ts-ignore
    setRowData(fetchedRowData);
  }, []);

  return (
    // IMPT: requires height and width for some reason?
    <div className="mx-auto mt-2" style={{ height: '40vh' }}>
      <div className="ag-theme-alpine h-full w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination
          paginationPageSize={10}
          rowHeight={65}
          onCellClicked={onCellClicked}
          onGridSizeChanged={(e) => (e.clientWidth > 1024 ? e.api.sizeColumnsToFit() : null)}
        />
      </div>
    </div>
  );
}

export default ImportDataTable;
