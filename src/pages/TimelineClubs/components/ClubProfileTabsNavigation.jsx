import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const ClubProfileTabsNavigation = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const TabComponents = [
        <div>Content for Item One</div>,
        <div>Content for Item Two</div>,
        <div>Content for Item Three</div>
      ];

  return (
    <>
         <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
          
        </Box>
    </>
  )
}

export default ClubProfileTabsNavigation
