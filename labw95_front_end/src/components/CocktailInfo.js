import React, {Component} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {Link} from "react-router-dom";
import {getCocktail} from "../store/actions/cocktailActions";
import connect from "react-redux/es/connect/connect";

class CocktailInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCocktail(id);
    }

    render() {
        return (
            <div>
                <div className="column">

                    <p className="cocktail_p">Cocktail</p>
                    <div className="one_cocktail">
                        {this.props.cocktail ? <div className="one_cocktail_thumbnail" key={this.props.cocktail._id}>
                            <div>
                                <ImageThumbnail image={this.props.cocktail.image} class="img_thumbnail"/>
                                <p>{this.props.cocktail.name}</p>
                            </div>
                            <div className="cocktail_recipe">
                                <p>Recipe:</p>
                                <p>{this.props.cocktail.recipe}</p>
                            </div>
                            <p/>
                            <div className="cocktail_ingredients_text">
                                {this.props.cocktail.ingredients.map(ingredient => {
                                    return <p>
                                        <span>{ingredient.name} : </span>
                                        <span><b>{ingredient.amount}</b></span>
                                    </p>
                                })}
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cocktail: state.cocktail.cocktail,
});

const mapDispatchToProps = dispatch => ({
    getCocktail: (id) => dispatch(getCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailInfo);