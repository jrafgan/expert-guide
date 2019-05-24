import React, {Component, Fragment} from 'react';
import {deleteCocktail, getCocktails, toggleCocktailPublish} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link} from "react-router-dom";

class MyCocktail extends Component {

    componentDidMount() {
        this.props.getCocktails(this.props.user._id)
    }

    deleteCocktail = e => {
        this.props.deleteCocktail(e.target.id);
    };

    togglePublishCocktail = e => {
        this.props.togglePublishCocktail(e.target.id);
    };

    render() {

        return (
                <div className="list_div">
                    <div className="column">
                        <p className="cocktail_p">My Cocktails</p>
                        {this.props.cocktails && this.props.cocktails.length !== 0 ? this.props.cocktails.map(item => {
                            return <div className="cocktail_thumbnail" key={item._id} id={item._id}>
                                <ImageThumbnail image={item.image} class="img_thumbnail"/>
                                <Link to={"/cocktail_info/" + item._id}>{item.name}</Link>
                                <p>Recipe:</p>
                                <p>{item.recipe}</p>
                                <div>
                                {item.published ? <Fragment>{this.props.user.role === 'admin' ? <button id={item._id} className="publish_btn"
                                                                       onClick={this.togglePublishCocktail}>Publish</button> : null}
                                    {this.props.user.role === 'admin' ? <button id={item._id} className="delete_btn"
                                                onClick={this.deleteCocktail}>Delete</button> : null}</Fragment> : <Fragment>{this.props.user.role === 'admin' ? <button id={item._id} className="unpublish_btn"
                                                                                                                    onClick={this.togglePublishCocktail}>Unpublish</button> : <p className="unpublish_btn">On moderation</p>}
                                    {this.props.user.role === 'admin' ? <button id={item._id} className="delete_btn"
                                            onClick={this.deleteCocktail}>Delete</button> : null}</Fragment>}
                                </div>
                            </div>
                        }) : <p>No cocktails yet</p>}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    error: state.cocktail.error,
    cocktails: state.cocktail.cocktails,
});

const mapDispatchToProps = dispatch => ({
    getCocktails: (userId) => dispatch(getCocktails(userId)),
    deleteCocktail: id => dispatch(deleteCocktail(id)),
    togglePublishCocktail: id => dispatch(toggleCocktailPublish(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCocktail);