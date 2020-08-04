import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {API_URL} from "../constants";

function CreateIngredient(props) {
    const { register, handleSubmit, errors } = useForm();
    const formSubmit = (data, e) => {
        axios.post(`${API_URL}/api/ingredient`, data)
            .then(res => props.history.push('/ingredient'))
            .catch(err => props.history.push('/ingredient'))
    }

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="columns">
                <div className="column is-offset-1">
                    <div className="field">
                        <label className="label">Nombre: </label>
                        <div className="control">
                            <input
                                name="name"
                                type='text'
                                placeholder='Ingrediente'
                                ref={register({ required: true })}
                            />
                            { errors.name && (<p className="tag is-warning">El nombre es requerido</p>) }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Precio por kilogramo: </label>
                        <div className="control">
                            <input
                                name="kilogramPrice"
                                type='number'
                                min="0"
                                ref={register({ required: true })}
                            />
                            { errors.kilogramPrice && (<p className="tag is-warning">El precio por kilogramo es requerido</p>) }
                        </div>
                    </div>
                </div>
                <div className="column is-offset-1">
                    <div className="field">
                        <label className="label">Precio por unidad: </label>
                        <div className="control">
                            <input
                                name="unitPrice"
                                type='number'
                                min="0"
                                ref={register({ required: true })}
                            />
                            { errors.unitPrice && (<p className="tag is-warning">El precio por unidad es requerido</p>) }
                        </div>
                    </div>
                </div>
            </div>
            <button className="button"
                    type="submit"
            >Guardar</button>
        </form>
    )
}

export default CreateIngredient