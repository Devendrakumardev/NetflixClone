import React, { useEffect, useRef, useState } from "react";
import "./TittleCard.css";
import cards_data from "../../assets/cards/Cards_data";

const TittleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njg5YzUzYzRkN2ZhMWMxZjJmZTA1MTZiNTQ3ZmZkMiIsIm5iZiI6MTcyNDk4MjkxMC4xOTA5ODgsInN1YiI6IjY2ZDEyMjFlYTg3ZTMxOGY3MGI1ZTY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pb5W1MMspxtFvBgFpXZRlCwmCMJd8Az6YhY82cwZgXg",
    },
  };

  const handleWeel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWeel);
  }, []);

  return (
    <div className="title-cards">
      <h1>{title ? title : " Popular on netflix"}</h1>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TittleCard;
