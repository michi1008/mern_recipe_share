import React from "react";
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import UserPosts from "./pages/UserPosts";
import SinglePostPage from "./pages/SinglePostPage";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import store from './store';
import { Provider } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<Home />}
      />
      <Route path='/posts/:postId' element={<SinglePostPage />} />
      <Route path='/about' element={<About />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/forget-password" element={<ForgetPasswordForm />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/create' element={<NewPost />} />
        <Route path='/posts/userPosts/:userId' element={<UserPosts />} />
        <Route path='/posts/userPosts/:postId/edit' element={<EditPost/>} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Route>
    </Route>
  )
);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  );
  
