import React, {Component} from 'react';
import {createCocktail} from "../store/actions/cocktailActions";
import connect from "react-redux/es/connect/connect";
import FormElement from "../components/FormElement";
import nanoid from "nanoid"

class AddCocktail extends Component {

    state = {
        name: '',
        recipe: '',
        ingredients: [
            {name: '', qty: '', id: nanoid(4)}
        ],
        image: null,
    };


    submitFormHandler = e => {
        e.preventDefault();
        if (this.state.image) {
            let formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    if (key === 'ingredients') {
                        const arr = JSON.stringify(this.state[key]);
                        console.log(JSON.stringify(this.state[key]))
                        return formData.append(key, arr);
;                    }

                    formData.append(key, this.state[key]);
                }
            });
            // formData = JSON.stringify(formData);
            console.log(formData);
            this.props.createCocktail(formData);
        } else {
            this.props.createCocktail(this.state)
        }
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    addIngredient = e => {
        e.preventDefault();
        this.setState({
            ingredients: [...this.state.ingredients,
                {name: '', qty: '', id: nanoid(4)}
            ]
        })
    };

    ingredientInputChangeHandler = (e, ndx) => {
        const ingredient = {...this.state.ingredients[ndx]};
        ingredient[e.target.name] = e.target.value;
        const ingredients = [...this.state.ingredients];
        ingredients[ndx] = ingredient;
        this.setState({ingredients});
    };

    removeIngredient = ndx => {
        const ingredients = this.state.ingredients;

        ingredients.splice(ndx, 1);
        this.setState({ingredients});
    };

    render() {

        return (
            <div className="form_div">

                <div className="main_nav">
                </div>
                <div className="album_form">
                    <h3 className="h3">Add cocktail</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="name"
                            title="Name"
                            type="text"
                            value={this.state.name}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('name')}
                            placeholder="Enter your desired name"
                            autocomplete="new-name"
                        />
                        <label htmlFor="description">Recipe</label>
                        <textarea
                            className="textarea"
                            id="recipe"
                            name="recipe"
                            value={this.state.recipe}
                            onChange={this.inputChangeHandler}
                            />
                        {this.getFieldError('recipe') && (<div className="invalid-feedback">
                            {this.getFieldError('recipe')}
                        </div>)}
                        <div>
                            Ingredients:
                            {this.state.ingredients.map((ing, ndx) => (
                                <div key={ing.id}>
                                    Name: <input type="text" name="name"
                                                 onChange={e => this.ingredientInputChangeHandler(e, ndx)} required/>
                                    Qty : <input type="text" name="qty"
                                                 onChange={e => this.ingredientInputChangeHandler(e, ndx)} required/>
                                    {ndx > 0 &&
                                    <button type="button" onClick={() => this.removeIngredient(ndx)}><b>X </b></button>}
                                </div>
                            ))}
                            <button onClick={this.addIngredient} type="button">Add ingredient</button>
                        </div>
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                        {this.getFieldError('image') && (<div className="invalid-feedback">
                            {this.getFieldError('image')}
                        </div>)}
                        <button type="submit" className="field_save_btn">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cocktails: state.cocktail.cocktails,
    error: state.cocktail.error,
});

const mapDispatchToProps = dispatch => ({
    createCocktail: (cocktailData) => dispatch(createCocktail(cocktailData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCocktail);