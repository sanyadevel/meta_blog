import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';

import NoInternetConnection from './components/NoInternetConnection';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import appStyles from './App.module.scss';

const App: FC = () => {
  return (
      <div className={appStyles.container}>
        <Online>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
            </Routes>
          </Router>
        </Online>
        <Offline>
          <NoInternetConnection />
        </Offline>
      </div>
  );
};

export default App;
