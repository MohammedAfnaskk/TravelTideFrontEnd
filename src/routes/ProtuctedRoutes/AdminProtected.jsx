import jwtDecode from "jwt-decode"
import React from 'react'
import { Outlet,Navigate } from "react-router-dom"



function AdminProtected(){
    const token = localStorage.getItem('token')
    console.log('sifandaxo');
    if (token){
        const decoded = jwtDecode(token)

        if (decoded.role === 'user'){
            return <Navigate to={'/'}/>
        }else if (decoded.role === 'guide'){
            return <Navigate to={'/guide/'}/>
        }else if (decoded.is_admin){
            return <Outlet/>
        }
    }else{
        return <Navigate to={'/admin/login'}/>
    }
}

export default AdminProtected