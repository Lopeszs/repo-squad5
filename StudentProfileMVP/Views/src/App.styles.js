import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const AppHeader = styled.header`
  background-color: #003366; /* Dark blue */
  color: #99ccff; /* Light blue text */
  padding: 15px 20px;
  text-align: center;
  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

export const AppMainContent = styled.main`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  gap: 20px;
`;

export const AppFooter = styled.footer`
  background-color: #003366; /* Dark blue */
  color: #99ccff; /* Light blue text */
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  p {
    margin: 0;
  }
`;
