import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./containers/Main";
import MyCocktail from "./containers/MyCocktail";
import AddCocktail from "./containers/AddCocktail";
import CocktailInfo from "./components/CocktailInfo";

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
            </Switch>
        </Fragment>
    );
};

export default Routes;