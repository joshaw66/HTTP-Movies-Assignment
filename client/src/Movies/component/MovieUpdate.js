import React, { useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";

const UpdateContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: 35%;
border-radius: 10px;
max-width: 30%;
padding-bottom: 3%;
background-color: lightgrey;
`
const UpdateForm = styled.div`
display: flex;
flex-direction: column;
max-width: 20%;
align-items: center;
`

const MovieUpdate = (props, match, history)=>{
    const [movie, setMovieEdit] = useState(
        {
            id: "",
            title: "",
            director: "",
            metascore: "",
            stars: []
        }
    );
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then( res=>{
            console.log("get movie update", res.data);
            setMovieEdit(res.data);})

    }, [props.match.params.id]);
    

    const handleChange = event =>{
        setMovieEdit({ ...movie,
             [event.target.name]: event.target.value});
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(res =>{
            setMovieEdit({
                id: "",
            title: "",
            director: "",
            metascore: "",
            stars: [] 
            })
            props.setSavedList([...props.savedList, res])
            props.history.push('/')
        })
    };
    return (
        <UpdateContainer>
            <h2>Update Movie</h2>
            <UpdateForm onSubmit={handleSubmit} className="form">
                <span>Title:</span> <input type="text" name="title" placeholder="title" onChange={handleChange} value={movie.title} />
                <span>Name: </span><input type="text" name="director" placeholder="name" onChange={handleChange} value={movie.director} />
                <span>Metascore:</span> <input type="text" name="metascore" placeholder="metascore" onChange={handleChange} value={movie.metascore} />
                <span>Stars:</span> <input type="text" name="stars" placeholder="stars" onChange={handleChange} value={movie.stars} />
                <span></span><input type="submit"  />
                
            </UpdateForm>
        </UpdateContainer>
    )
}
export default MovieUpdate;