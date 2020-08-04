import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import CreateRecipe from "./CreateRecipe";

class RecipeLayout extends Component {
    render() {
        return (
            <div className="recipe">
                <h2 className="title">Recetas</h2>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={'/recipe'} className="navbar-item">Listado</Link>
                        <Link to={'/recipe/add'} className="navbar-item">Crear receta</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path={"/recipe"} component={RecipeList} />
                    <Route exact path={"/recipe/add"} component={CreateRecipe} />
                </Switch>
            </div>
        )
    }
}

export default RecipeLayout