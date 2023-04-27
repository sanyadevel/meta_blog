import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';

import NoInternetConnection from './components/NoInternetConnection';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import appStyles from './App.module.scss';
import ArticleList from './components/ArticleList';
import PageIsNotFound from './components/PageIsNotFound';
import UserPage from './components/UserPage';
import Header from './components/Header';

const App: FC = () => {
  return (
      <div className={appStyles.container}>
        <Online>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<ArticleList/>} />
              <Route path="/articles" element={<ArticleList/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/user" element={<UserPage/>} />
              <Route path="*" element={<PageIsNotFound/>} />
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
