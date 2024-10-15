import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import FilmCard from './FilmCard';
import Title from './Title';
import { AdamContext } from './App'; 
import './index.css';
import './App.css';

function Home() {
  const { home, latest, classic, searched, data } = useContext(AdamContext);

  const getRating = (movie) => {
    if (movie.Ratings && movie.Ratings[0] && movie.Ratings[0].Value) {
      const ratingStr = movie.Ratings[0].Value;
      return parseFloat(ratingStr.slice(0, 3)); // Safely slice the value
    }
    return null;
  };

  return (
    <>
      {searched ? (
        <div className=' flex gap-3 p-3 flex-wrap'>
          {data.map((d) => (
            <Link key={d.imdbID} to={`/${d.imdbID}`}>
              <FilmCard d={d} rating={getRating(d)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-full">
          <Title text="Watch At Home" />

          <Splide
            options={{
              pagination: true,
              arrows: true,
              perPage: 7,
              padding: 60,
              gap: 40,
            }}
            className="flex flex-row h-[380px]"
          >
            {home.map((d) => (
              <SplideSlide key={d.imdbID}>
                <Link to={`/${d.imdbID}`}>
                  <FilmCard d={d} rating={getRating(d)} />
                </Link>
              </SplideSlide>
            ))}
          </Splide>

          <Title text="Latest Movies" />

          <Splide
            options={{
              pagination: true,
              arrows: true,
              perPage: 7,
              padding: 60,
              gap: 40,
            }}
            className="flex flex-row h-[380px]"
          >
            {latest.map((d) => (
              <SplideSlide key={d.imdbID}>
                <Link to={`/${d.imdbID}`}>
                  <FilmCard d={d} rating={getRating(d)} />
                </Link>
              </SplideSlide>
            ))}
          </Splide>

          <Title text="Classics to Rewatch" />

          <Splide
            options={{
              pagination: true,
              arrows: true,
              perPage: 7,
              padding: 60,
              gap: 40,
            }}
            className="flex flex-row h-[380px]"
          >
            {classic.map((d) => (
              <SplideSlide key={d.imdbID}>
                <Link to={`/${d.imdbID}`}>
                  <FilmCard d={d} rating={getRating(d)} />
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      ) }
    </>
  );
}

export default Home;
