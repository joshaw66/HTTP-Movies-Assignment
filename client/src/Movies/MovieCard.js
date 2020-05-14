import React from 'react';
import styled from 'styled-components';

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff6bd;
  border-radius: 10px;
`

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <MovieCardContainer className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </MovieCardContainer>
  );
};

export default MovieCard;
