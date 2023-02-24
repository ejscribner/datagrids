import React, { useState } from 'react';
import Toggle from 'components/toggle';
import 'datagrids/style.scss';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleUser, faEllipsisV, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
fontawesome.library.add(
  faSearch as IconDefinition
); // Optional theme CSS
const importheader = () => {
  const options = [
    { value: 'All', label: 'All' },
    { value: 'MyImports', label: 'MyImports' },
  ];
  return (
    <div className='header'>
      <div className='header-left'>
        <div className='header-title'>Import</div>
        <div className='header-search'>
          <input style={{fontSize:"18px", outline:"none"}} placeholder='Search...'/>
          <FontAwesomeIcon icon={faSearch} style={{alignSelf:"center", color:"#aaa"}}/>
        </div>
        <div className='header-toggle'>
          <Toggle value="All" options={options} altText="" />
        </div>
      </div>
      <div className='header-right'>
        <button className='btn info' type="button" >Import</button>
      </div>
    </div>
  );
}
export default importheader;