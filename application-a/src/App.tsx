import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import { Container, Paper } from '@mui/material';
import AppNavigation from './components/AppNavigation/AppNavigation';
import Title from './components/Title/Title';

function App() {
  const AppBackground = styled.section`
    min-height: 100vh;
    background-color: #282c34;
  `;

  const AppContainer = styled(Container)`
    padding-left: 10px;
    padding-right: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(5px + 2vmin);
  `;
  
  return (
    <AppBackground>
      <AppContainer maxWidth="lg">
        <Paper style={{ minHeight: '100vh', paddingTop: 50 }}>
          <Title />
          <AppNavigation />
        </Paper>
      </AppContainer>
    </AppBackground>
  );
}

export default App;
