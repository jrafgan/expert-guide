import React, {Component} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {Link} from "react-router-dom";
import {getCocktail} from "../store/actions/musicActions";
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

                    <p className="album_p">Cocktail</p>
                    <div className="one_artist">
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
                    {this.props.albums ? this.props.albums.map(item => {
                        return <div className="cocktail_thumbnail" key={item._id}>
                            <ImageThumbnail image={item.image} class="img_thumbnail"/>/>
                            <p className="not_published">{item.published ? '' : 'not published'}</p>
                            <p>{item.name}</p>
                            <p>{item.recipe}</p>
                            <Link to={"/track_info/" + item._id}>Трэки</Link>
                        </div>
                    }) : null}
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