import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Main from "./containers/Main";
import MyCocktail from "./containers/MyCocktail";
import AddCocktail from "./containers/AddCocktail";
import CocktailInfo from "./components/CocktailInfo";
import TrackInfo from "./components/TrackInfo";
import TrackHistory from "./containers/TrackHistory";
import AddTrack from "./containers/AddTrack";
import AdminBackOffice from "./components/AdminBackOffice";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
};

const Routes = ({user}) => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact component={Main} />
                <ProtectedRoute
                    isAllowed={user}
                    path="/add_cocktail"
                    exact
                    component={AddCocktail}
                />
                <Route path="/my_cocktail" exact component={MyCocktail} />
                <Route path="/cocktail_info/:id" exact component={CocktailInfo} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Fragment>
    );
};

export default Routes;