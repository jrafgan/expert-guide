import React from 'react';
import {NavLink} from "react-router-dom";
import ImageThumbnail from "./ImageThumbnail";

const UserMenu = ({user, logout}) => {

    return (
        <div className="user_menu">
            <div>
                Hello, {user.name}!
                <ImageThumbnail image={user.image} class="avatar_img" facebookId={user.facebookId}/>
            </div>
            {user.username === 'admin' ? <NavLink to="/admin_office/" exact>Админ офис</NavLink> : null}
            <NavLink to="/my_cocktail" exact>My cocktails</NavLink>
            <NavLink to="/add_cocktail" exact>Add cocktail</NavLink>
            <NavLink onClick={logout} to="/" exact>Выйти</NavLink>
        </div>)
};

export default UserMenu;