import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    const {user,loading}=useAuth();
    if(loading) return <Loading/>
    if(user || user.email) return children
    return <Navigate to="/login" state={{from:location.pathname}} replace ></Navigate>

};

export default PrivateRoute;