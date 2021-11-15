import React, { useState } from 'react';
import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import FrontPage from '../AppTabs/FrontPage/FrontPage';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import FeedbackForm from '@sami-p/feedbackform';

const AppNavigation = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [activeTab, setActiveTab] = useState(0);

  const Content = styled(Box)`
    margin-left: ${isLg ? '100px' : '25px'};
    margin-right: ${isLg ? '100px' : '25px'};
    margin-top: 10px;
    padding-bottom: 20px;
  `;

  return (
    <>
      <Tabs
        centered
        value={activeTab}
        onChange={(event, newTab) => setActiveTab(newTab)}
      >
        <Tab label="Home" />
        <Tab label="Feedback" />
      </Tabs>

      <Content>
        {activeTab === 0 && (
          <FrontPage />
        )}

        {activeTab === 1 && (
          <FeedbackForm />
        )}
      </Content>
    </>
  );
};

export default AppNavigation;
