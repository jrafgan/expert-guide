import React, {Component, Fragment} from 'react';
import '../App.css'
import {deleteCocktail, getCocktails, toggleCocktailPublish} from "../store/actions/cocktailActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link} from "react-router-dom";


class Main extends Component {

    componentDidMount() {
        this.props.getCocktails();
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.props.getCocktails();
        }
    }

    deleteCocktail = e => {
        this.props.deleteCocktail(e.target.id);
    };

    togglePublishCocktail = e => {
        this.props.togglePublishCocktail(e.target.id);
    };

    render() {

        return (
            <div className="App">
                <div className="list_div">
                    <div className="column">
                        <p className="cocktail_p">Cocktails</p>
                        {this.props.cocktails ? this.props.cocktails.map(item => {
                            return <div className="cocktail_thumbnail" key={item._id} id={item._id}>
                                <ImageThumbnail image={item.image} class="img_thumbnail"/>
                                <Link to={"/cocktail_info/" + item._id}>{item.name}</Link>
                                <div>
                                {this.props.user && this.props.user.role === 'admin' ? <Fragment>{!item.published ? <button id={item._id} className="publish_btn"
                                                                                                         onClick={this.togglePublishCocktail}>Publish</button> : <button id={item._id} className="unpublish_btn"
                                                                                                                                                                         onClick={this.togglePublishCocktail}>Unpublish</button>}
                                    <button id={item._id} className="delete_btn"
                                            onClick={this.deleteCocktail}>Delete</button></Fragment> : <Fragment>{!item.published ? <p className="unpublish_btn">On moderation</p> : null}</Fragment>}
                                </div>
                            </div>
                        }) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cocktails: state.cocktail.cocktails,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getCocktails: () => dispatch(getCocktails()),
    deleteCocktail: id => dispatch(deleteCocktail(id)),
    togglePublishCocktail: id => dispatch(toggleCocktailPublish(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);