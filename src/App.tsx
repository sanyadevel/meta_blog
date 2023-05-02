import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import appStyles from './App.module.scss';
import ArticleList from './components/ArticleList';
import PageIsNotFound from './components/PageIsNotFound';
import UserPage from './components/UserPage';
import Header from './components/Header';
import { useAppSelector } from './store';
import CustomArticle from './components/CustomArticle';
import FullPageArticle from './components/FullPageArticle';

const App: FC = () => {
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

  return (
      <div className={appStyles.container}>
          <Router>
            {!isUserLoggedIn && <Header/>}
            <Routes>
              <Route path='/' element={<ArticleList/>} />
              <Route path='/articles' element={<ArticleList/>} />
              <Route path='/articles/:slug' element={<FullPageArticle/>}/>
              <Route path="/sign-in" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/profile" element={<UserPage/>} />
              <Route path="/form" element={<CustomArticle/>} />
              <Route path="*" element={<PageIsNotFound/>} />
            </Routes>
          </Router>
      </div>
  );
};

export default App;
