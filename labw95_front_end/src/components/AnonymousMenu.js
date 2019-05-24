import React from 'react';
import {NavLink} from "react-router-dom";
import FacebookLogin from "./FacebookLogin";

const AnonymousMenu = () => (
    <div className="anonymous_menu">
        <div>
            <FacebookLogin/>
        </div>
    </div>
);

export default AnonymousMenu;