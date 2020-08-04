import React, {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from "../constants";

function IngredientList(props) {
    const [ingredientList, setIngredientList] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios(`${API_URL}/api/ingredient`);
            setIngredientList(response.data.ingredients)
        }

        fetchIngredients();
    }, []);

    return (
        <table className="table">
            <thead>
            <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Fecha de actualización</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {
                ingredientList.map((ingredient, index) => {
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ ingredient.name }</td>
                            <td>{ ingredient.updatedAtFormat }</td>
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

export default IngredientList