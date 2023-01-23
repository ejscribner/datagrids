import './app.scss';
import IndexDataTable from './datagrids/IndexDataTable';
import ImportDataTable from './datagrids/ImportDataTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export default function App() {
  return (
    <Tabs className='mt-16 w-11/12 mx-auto'>
      <TabList>
        <Tab>Indexes</Tab>
        <Tab>Import Data</Tab>
      </TabList>

      <TabPanel>
        <IndexDataTable/>
      </TabPanel>
      <TabPanel>
        <ImportDataTable/>
      </TabPanel>
    </Tabs>
  );
}
