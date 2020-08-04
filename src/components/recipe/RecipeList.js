import React, {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from "../constants";

function RecipeList(props) {
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios(`${API_URL}/api/recipe`);
            setRecipeList(response.data.recipes);
        }

        fetchRecipes();
    }, [])

    return (
        <table className="table">
            <thead>
            <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Fecha de actualización</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {
                recipeList.map((recipe, index) => {
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ recipe.title }</td>
                            <td>${ recipe.cost } MXN</td>
                            <td>{ recipe.updatedAtFormat }</td>
                            <td className="options">

                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default RecipeList