import React, { useState, useEffect} from "react";
import axios from "axios";

const MovieUpdate = (props, match, history)=>{
    const [movieEdit, setMovieEdit] = useState(
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
        setMovieEdit({ ...movieEdit,
             [event.target.name]: event.target.value});
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieEdit)
        .then(res =>{
            console.log("movie updated", res);
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
        .catch(error =>{console.log('movie did not Update', error)})
    };
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit} className="form">
                <span>Title:</span> <input type="text" name="title" placeholder="title" onChange={handleChange} value={movieEdit.title} />
                <span>Name: </span><input type="text" name="director" placeholder="name" onChange={handleChange} value={movieEdit.director} />
                <span>Metascore:</span> <input type="text" name="metascore" placeholder="metascore" onChange={handleChange} value={movieEdit.metascore} />
                <span>Stars:</span> <input type="text" name="stars" placeholder="stars" onChange={handleChange} value={movieEdit.stars} />
                <span></span><input type="submit"  />
                
            </form>
        </div>
    )
}
export default MovieUpdate;