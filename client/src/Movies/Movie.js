import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 15%;
`
const Save = styled.div`
  display: flex
  justify-content: center;
  align-items: center;
  margin-right: 22%;

`

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  handleDelete = id =>{
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then(res => this.props.history.push('/'))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie...</div>;
    }

    return (
      <MainContainer className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Save className="save-button" onClick={this.saveMovie}>
          Save
        </Save>
        <button> <Link to={`/update-movies/this.state.movie.id`}>Edit Movie</Link></button>
        <button onClick={this.handleDelete}>Delete Movie</button>
      
      </MainContainer>
    );
  }
}