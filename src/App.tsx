import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import appStyles from './App.module.scss';
import ArticleList from './components/ArticleList';
import PageIsNotFound from './components/PageIsNotFound';
import UserPage from './components/UserPage';
import Header from './components/Header';
import { useAppDispatch, useAppSelector } from './store';
import CustomArticle from './components/CustomArticle';
import FullArticle from './components/FullArticle';
import { useCurrentUserQuery } from './slices/getUser';
import { changeUserActiveStatus, uploadUserInfo } from './slices/userProfileInfo';
import EditedUser from './components/EditedUser';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');
  const userInfo = useAppSelector((state) => state.userInfo.userDatas);

  const { data: userData } = useCurrentUserQuery({});


  useEffect(() => {
    if (token && !userInfo?.token) {
      dispatch(changeUserActiveStatus({ isUserLoggedIn: true }));
      dispatch(uploadUserInfo({ userDatas: userData?.user }));
    }
  }, [token, userData]);

  return (
      <div className={appStyles.container}>
          <Router>
             <Header/>
            <Routes>
              <Route path='/' element={<ArticleList/>} />
              <Route path='/articles/' element={<ArticleList/>} />
              <Route path='/articles/:slug' element={<FullArticle/>}/>
              <Route path='/articles/:slug/edit' element={<CustomArticle/>}/>
              <Route path="/sign-in" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/user" element={<UserPage/>} />
              <Route path="user/new-article" element={<CustomArticle/>} />
              <Route path="/profile" element={<EditedUser/>}/>
              <Route path="*" element={<PageIsNotFound/>} />
            </Routes>
          </Router>
      </div>
  );
};

export default App;
