import React, { useState, useCallback } from 'react';
import Select, { components } from 'react-select';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCircle, faCircleUser, faEllipsisV, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import Toggle from 'components/toggle';
import servicesData from './data/servicesData.json';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAreaChart, faBarcode, faCalendar, faTelevision, faReorder } from '@fortawesome/free-solid-svg-icons';
import parser from 'html-react-parser';

fontawesome.library.add(
  faEllipsisV as IconDefinition,
  faCircle as IconDefinition,
  faCircleUser as IconDefinition,
  faSpinner as IconDefinition,
  faSearch as IconDefinition
); // Optional theme CSS

{/* <FontAwesomeIcon icon={faSearch} style={{alignSelf:"center", margin: "0 5px 0 5px", color:"#aaa"}}/> */}

function ServicesCellRenderer() {
  const options = [
    { value: 'data', label:  <span><FontAwesomeIcon icon={faAreaChart} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Data</span>},
    { value: 'index', label: <span><FontAwesomeIcon icon={faBarcode} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Index</span>},
    { value: 'query', label: <span><FontAwesomeIcon icon={faCalendar} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Query</span>},
    { value: 'search', label: <span><FontAwesomeIcon icon={faSearch} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Search</span>},
    { value: 'analytics', label: <span><FontAwesomeIcon icon={faTelevision} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Analytics</span>},
    { value: 'eventing', label: <span><FontAwesomeIcon icon={faReorder} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Eventing</span>},
  ];

  const [selectedOptions, setSelectedOptions] = useState([
    { value: 'data', label:  <span><FontAwesomeIcon icon={faAreaChart} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Data</span>},
    { value: 'index', label: <span><FontAwesomeIcon icon={faBarcode} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Index</span>},
    { value: 'query', label: <span><FontAwesomeIcon icon={faCalendar} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Query</span>},
    { value: 'search', label: <span><FontAwesomeIcon icon={faSearch} style={{alignSelf:"center", margin: "0 5px 0 5px"}}></FontAwesomeIcon>Search</span>},
  ]);
  const colourStyles = {
    multiValue: (styles:any) => {
      return {
        ...styles,
        backgroundColor: 'aliceblue',
        borderRadius: '20px',
        paddingRight: '3px',
        paddingLeft: '3px'
      };
    },
    multiValueLabel: () => ({
      color: 'black',
    }),
    multiValueRemove: () => ({
      ':hover': {
        backgroundColor: 'none',
      },
    }),
  }
  return (
    <div className="w-full no-focus-shadow">
      <Select
        menuPortalTarget={document.body}
        styles={{menuPortal: (base) => ({ ...base, zIndex: 9999 })}}
        isMulti
        defaultValue={selectedOptions}
        // @ts-ignore
        onChange={setSelectedOptions}
        styles={colourStyles}
        options={options}
      />
    </div>
  );
}

function NodesCellRenderer() {
  const options = [
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
  ];
  return (
    <div className="w-full no-focus-shadow">
      <Select defaultValue={options[0]} options={options} menuPortalTarget={document.body} />
    </div>
  );
}

function ComputeCellRenderer() {
  const options = servicesData.data.specs[0].computeOptions.map((computeOption) => {
    return {
      value: computeOption.compute.key,
      label: `${computeOption.compute.vcpus} ${computeOption.compute.memory}`,
      subheading: computeOption.compute.key,
    };
  });

  function Option(props: any) {
    return (
      <div className="flex">
        <components.Option {...props}>
          <div className="mb-0.5">{props.data.label}</div>
          <div className="text-sm font-light">{props.data.subheading}</div>
        </components.Option>
      </div>
    );
  }

  return (
    <div className="w-full no-focus-shadow">
      <Select defaultValue={options[0]} options={options} components={{ Option }} menuPortalTarget={document.body} />
    </div>
  );
}

function DiskCellRenderer() {
  const options = [
    { value: 'gp3', label: 'GP3' },
    { value: 'io2', label: 'IO2' },
  ];

  return (
    <div>
      <Toggle value="gp3" options={options} altText="" />
    </div>
  );
}

function StorageCellRenderer() {
  return (
    <div>
      <input
        className="w-full rounded h-12"
        type="number"
        id="storage"
        name="storage"
        min="50"
        max="16000"
        defaultValue={50}
        style={{ borderColor: 'rgb(204,204,204)' }}
      />
    </div>
  );
}

function IOPSCellRenderer() {
  return (
    <div>
      <input
        className="w-full rounded h-12"
        type="number"
        id="iops"
        name="iops"
        min="3000"
        max="16000"
        defaultValue={3000}
        style={{ borderColor: 'rgb(204,204,204)' }}
      />
    </div>
  );
}

function ServicesDataTable() {
  const [saveFlag, setSaveFlag] = useState(false);
  const [rowData] = useState([
    {
      services: 'services dropdown',
      nodes: 'nodes dropdown',
      compute: 'Compute Dropdown',
      diskType: 'diskSwitch',
      storage: 'storage picker',
      iops: 'iops picker',
    },
  ]);

  const [columnDefs] = useState([
    { field: 'services', headerName: 'services', cellRenderer: ServicesCellRenderer, width: 500},
    { field: 'nodes', headerName: 'nodes', cellRenderer: NodesCellRenderer, width: 120 },
    { field: 'compute', headerName: 'compute', cellRenderer: ComputeCellRenderer, width: 250 },
    { field: 'diskType', headerName: 'disk type', cellRenderer: DiskCellRenderer, width: 150 },
    { field: 'storage', headerName: 'storage (GB)', cellRenderer: StorageCellRenderer, width: 120 },
    { field: 'iops', headerName: 'iops', cellRenderer: IOPSCellRenderer, width: 150 },
  ]);

  return (
    // IMPT: requires height and width for some reason?
    <div className="mx-auto" style={{ height: '40vh' }}>
      <div className="ag-theme-custom h-full w-full">
        <div className="header">
          <div className='header-left'>
            <div style={{marginTop: "16px", fontSize: "24px", fontWeight: "600"}}>Services</div>
          </div>
          <div className='header-right'>
            <button className='btn-add-group'>
              <div className='btn-add-group inline'>
                <FontAwesomeIcon icon={faPlus} style={{color:'white', marginRight:"15px"}}/>Add Service Group
              </div>
            </button>
          </div>
        </div>
        <div className='header-subtitle'>Your available services depend on your database plan. <a href='#' style={{color:'#0266c2'}}>Learn More</a>
        </div>
        <AgGridReact
          className='header-black'
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={120}
          rowSelection={'single'}
          suppressRowClickSelection={true}
          onRowClicked={() => setSaveFlag(true)}
          onGridSizeChanged={(e) => (e.clientWidth > 1200 ? e.api.sizeColumnsToFit() : null)}
        />
        { saveFlag ? (
          <div className='save-option'>
            <button className='btn save' type="button" >Save</button>
            <button className='btn cancel'type='button'>Cancel</button>
          </div>) : null }
      </div>
    </div>
  );
}

export default ServicesDataTable;
