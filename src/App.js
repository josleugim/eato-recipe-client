import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import IngredientLayout from "./components/ingredient/IngredientLayout";
import Header from "./components/common/Header";
import RecipeLayout from "./components/recipe/RecipeLayout";

function App() {
  return (
    <div className="App">
        <Header />
        <Switch>
            <Route path="/ingredient" component={IngredientLayout} />
            <Route path={"/recipe"} component={RecipeLayout} />
        </Switch>
    </div>
  );
}

export default withRouter(App);
