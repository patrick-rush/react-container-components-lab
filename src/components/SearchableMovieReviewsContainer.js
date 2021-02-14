import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?';

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {
    state = {
        reviews: [],
        searchTerm: ""
    }

    fetchMovies() {
        fetch(`${URL}query=${this.state.searchTerm}&api-key=${NYT_API_KEY}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    reviews: json.results
                });
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.fetchMovies()
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    render() {
        return (
            <div className="searchable-movie-reviews">
                <h1>Search Results</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.searchTerm} onChange={this.handleChange}></input>
                    <input type="submit" value="Search"></input>
                </form>
                <MovieReviews reviews={this.state.reviews}/>
            </div>
        )
    }

    componentDidMount() {
        this.fetchMovies()
    }
}