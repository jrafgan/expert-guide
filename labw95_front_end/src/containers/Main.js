import React, {Component} from 'react';
import '../App.css'
import {getCocktails} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link} from "react-router-dom";


class Main extends Component {

    componentDidMount() {
        this.props.getCocktails();
    }

    selectChangeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    inputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {

        return (
            <div className="App">
                <div className="list_div">
                    <div className="column">
                        <p className="artist_p">Cocktails</p>
                        {this.props.cocktails ? this.props.cocktails.map(item => {
                            return <div className="artist_thumbnail" key={item._id} id={item._id}  >
                                <ImageThumbnail image={item.image} class="img_thumbnail"/>/>
                                <p>{item.name}</p>
                                <p className="artist_description">{item.description}</p>
                                <Link to={"/album_info/" + item._id}>Альбомы</Link>
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
});

const mapDispatchToProps = dispatch => ({
    getCocktails: () => dispatch(getCocktails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);