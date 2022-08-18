import { RouteObj } from './type'
import { PATH_LOGIN, PATH_REGISTER, PATH_EDITOR, PATH_ARTICLE, PATH_SETTINGS, PATH_PROFILE, PATH_HOME, PATH_NOTMATCH } from '../constant'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Article from '../pages/Article'
import Settings from '../pages/Settings'
import Profile from '../pages/Profile'
import Editor from '../pages/Editor'
import Home from '../pages/Home'
import NotMatch from '../pages/NotMatch'
import React from 'react'
const routes: RouteObj[] = [
    {
        path: PATH_LOGIN,
        element: <Login />
    },
    {
        path: PATH_ARTICLE,
        element: <Article match={1} />
    },
    {
        path: PATH_SETTINGS,
        element: <Settings />
    },
    {
        path: PATH_EDITOR,
        element: <Editor />
    },
    {
        path: PATH_PROFILE,
        element: <Profile />
    },
    {
        path: PATH_HOME,
        element: <Home />
    },
    {
        path: PATH_REGISTER,
        element: <Register />
    },
    {
        path: PATH_NOTMATCH,
        element: <NotMatch />
    },
]
export default routes