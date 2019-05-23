import React from 'react';
import {NavLink} from "react-router-dom";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Layout = ({user, logout}) => {

    return (
        <div className="main_nav">
            <div><NavLink to="/" exact>Coctail builder</NavLink></div>
            {user ?
                <UserMenu user={user} logout={logout}/> : <AnonymousMenu/>}
        </div>
    )
};


export default Layout;