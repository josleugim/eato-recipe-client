import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import IngredientList from "./IngredientList";
import CreateIngredient from "./CreateIngredient";

class IngredientLayout extends Component {
    render() {
        return (
            <div className="ingredient">
                <h2 className="title">Ingredientes</h2>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={'/ingredient'} className="navbar-item">Listado</Link>
                        <Link to={'/ingredient/add'} className="navbar-item">Crear ingrediente</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path={"/ingredient"} component={IngredientList} />
                    <Route exact path={"/ingredient/add"} component={CreateIngredient} />
                </Switch>
            </div>
        )
    }
}

export default IngredientLayout