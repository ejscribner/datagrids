import React, { useState } from 'react';
import Select, { components } from 'react-select';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCircle, faCircleUser, faEllipsisV, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import Toggle from 'components/toggle';
import servicesData from './data/servicesData.json';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

fontawesome.library.add(
  faEllipsisV as IconDefinition,
  faCircle as IconDefinition,
  faCircleUser as IconDefinition,
  faSpinner as IconDefinition
); // Optional theme CSS

function ServicesCellRenderer() {
  const options = [
    { value: 'data', label: 'Data' },
    { value: 'index', label: 'Index' },
    { value: 'query', label: 'Query' },
    { value: 'search', label: 'Search' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'eventing', label: 'Eventing' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([
    { value: 'data', label: 'Data' },
    { value: 'index', label: 'Index' },
    { value: 'query', label: 'Query' },
    { value: 'search', label: 'Search' },
  ]);

  return (
    <div className="w-full no-focus-shadow">
      <Select
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        isMulti
        defaultValue={selectedOptions}
        // @ts-ignore
        onChange={setSelectedOptions}
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
    { field: 'services', headerName: 'Services', cellRenderer: ServicesCellRenderer, width: 500 },
    { field: 'nodes', headerName: 'Nodes', cellRenderer: NodesCellRenderer, width: 120 },
    { field: 'compute', headerName: 'Compute', cellRenderer: ComputeCellRenderer, width: 250 },
    { field: 'diskType', headerName: 'Disk Type', cellRenderer: DiskCellRenderer, width: 150 },
    { field: 'storage', headerName: 'Storage (GB)', cellRenderer: StorageCellRenderer, width: 120 },
    { field: 'iops', headerName: 'IOPS', cellRenderer: IOPSCellRenderer, width: 150 },
  ]);

  return (
    // IMPT: requires height and width for some reason?
    <div className="mx-auto" style={{ height: '40vh' }}>
      <div className="ag-theme-alpine h-full w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={120}
          onGridSizeChanged={(e) => (e.clientWidth > 1200 ? e.api.sizeColumnsToFit() : null)}
        />
      </div>
    </div>
  );
}

export default ServicesDataTable;
