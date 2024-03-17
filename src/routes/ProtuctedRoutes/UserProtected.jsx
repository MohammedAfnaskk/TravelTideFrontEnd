import jwtDecode from 'jwt-decode'
import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'


function UserProtected() {
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)
        if (decoded.role === 'user'){
            return <Outlet/>
        }else if (decoded.role === 'guide'){
            return<Navigate to={'/guide/'}/>
        }else if (decoded.role === "admin" && decoded.is_admin){
            return <Navigate to={'/admin/dashbord'}/>
        }
    }else{
        return <Navigate to={'/'}/>
    }

  
}

export default UserProtected