import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// const MainContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const MovieForm = props => {
  const [item, setItem] = useState(initialItem);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "movie") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/update-movie/:id", item)
      .then(res => {
        console.log(res);
        props.updateItems(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Add New Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;