import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {API_URL} from "../constants";

function CreateRecipe(props) {
    const { register, handleSubmit, errors } = useForm();
    const formSubmit = (data, e) => {
        const customData = {
            title: data.title,
            ingredients: inputList
        };

        axios.post(`${API_URL}/api/recipe`, customData)
            .then(res => props.history.push('/recipe'))
            .catch(err => props.history.push('/recipe'))
    };
    const [inputList, setInputList] = useState([{ ingredientId: "", quantity: "", unit: "" }]);
    const [ingredientList, setIngredientList] = useState([]);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios(`${API_URL}/api/ingredient`);
            setIngredientList(response.data.ingredients)
        }

        fetchIngredients();
    }, []);

    const handleAddIngredient = () => {
        setInputList([...inputList, { ingredientId: "", quantity: "", unit: "", kilogramPrice: 0, unitPrice: 0 }]);
    };

    const handleRemoveIngredient = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        if (name === 'ingredientId') {
            const ingredient = JSON.parse(value)
            list[index][name] = ingredient._id;
            list[index]['kilogramPrice'] = ingredient.kilogramPrice;
            list[index]['unitPrice'] = ingredient.unitPrice;
        } else {
            list[index][name] = value;
        }

        setInputList(list);
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="columns">
                <div className="column is-offset-1">
                    <div className="field">
                        <label className="label">Título: </label>
                        <div className="control">
                            <input
                                name="title"
                                type='text'
                                placeholder='Receta'
                                ref={register({ required: true })}
                            />
                            { errors.title && (<p className="tag is-warning">El título es requerido</p>) }
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <h2 className="subtitle">Costo: </h2>
                    <p>
                        ${
                            inputList.reduce((acc, item) => {
                                switch (item.unit) {
                                    case 'kg':
                                        acc = acc + (item.quantity * item.kilogramPrice);
                                        break;
                                    case 'unidad':
                                        acc = acc + (item.quantity * item.unitPrice);
                                        break;
                                }

                                return acc
                            }, 0)
                        } MXN
                    </p>
                </div>
                <div className="column">
                    <button
                        className="button"
                        type="button"
                        onClick={handleAddIngredient}
                    >Agregar otro ingrediente</button>
                </div>
            </div>
            {
                inputList.map((item, index) => {
                    return (
                        <div className="columns" key={index}>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Ingrediente</label>
                                    <div className="control">
                                        <div className="select">
                                            <select
                                                name="ingredientId"
                                                defaultValue={item.ingredientId}
                                                onChange={e => handleInputChange(e, index)}
                                            >
                                                <option value=""> - </option>
                                                {
                                                    ingredientList.map((ingredient, index) => {
                                                        return (
                                                            <option key={index} value={JSON.stringify(ingredient)}>{ ingredient.name }</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Cantidad</label>
                                    <div className="control">
                                        <input
                                            name="quantity"
                                            type="number"
                                            defaultValue={item.quantity}
                                            min="0"
                                            onChange={e => handleInputChange(e, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Unidad</label>
                                    <div className="control">
                                        <div className="select">
                                            <select
                                                name="unit"
                                                defaultValue={item.unit}
                                                onChange={e => handleInputChange(e, index)}
                                            >
                                                <option value="">-</option>
                                                <option value="kg">Kg</option>
                                                <option value="unidad">Unidad</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIngredient(index)}
                                    >Quitar ingrediente</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <button className="button"
                    type="submit"
            >Guardar</button>
        </form>
    )
}

export default CreateRecipe