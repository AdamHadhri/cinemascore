import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';
import Home from './Home';
import Movie from './Movie';
import HomeFilms from './HomeFilms';
import LatestMovies from './LatestMovies';
import classicsToRewatch from './classicsToRewatch';
import './index.css';
import './App.css';

export const AdamContext = createContext();

function App() {
  const [home, setHome] = useState([]);
  const [latest, setLatest] = useState([]);
  const [classic, setClassic] = useState([]);
  const [options, setOptions] = useState([]);
  const [phrase, setPhrase] = useState('');
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
const searchMovies = async () => {
  if (searched) {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${phrase}&apikey=e6432a8d`);
      if (res.data.Search) {
        const options = res.data.Search.map((option) => ({
          value: `${option.Title} (${option.Year})`,
          key: option.imdbID,
        }));
        setOptions(options);

        options.forEach(async (item) => {
          await fetchData(item.key);
        });
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};


    const fetchData = async (item) => {
      if (searched) {
        try {
          const res = await axios.get(`https://www.omdbapi.com/?i=${item}&apikey=e6432a8d`);
          if (res.data) {
            setData((prevData) => [...prevData, res.data]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    searchMovies();
  }, [phrase, searched]);


  useEffect(() => {
    setOptions([])
    setData([])
    setSearched(false);
    setSearching(true);
    
  }, []);

  useEffect(() => {
    const fetchMovies = async (name, setter) => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?t=${name}&apikey=e6432a8d`);
        if (res.data) {
          setter((prevMovies) => [...prevMovies, res.data]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    HomeFilms.forEach((name) => fetchMovies(name, setHome));
    LatestMovies.forEach((name) => fetchMovies(name, setLatest));
    classicsToRewatch.forEach((name) => fetchMovies(name, setClassic));

  }, []);

  return (
    <AdamContext.Provider value={{ home, latest, classic, searched, data, options, searching, setSearching }}>
      <div className="bg-[#781F3B] flex justify-between items-center gap-4 w-full py-5 px-8">
        <Link onClick={() => {setSearched(false);setSearching(true)}} to="/">
          <img src="%PUBLIC_URL%/logo.svg" alt="CinemaScore" className="h-8" />
        </Link>

        { searching ? <AutoComplete
          popupClassName="certain-category-search-dropdown"
          style={{ width: 300, height: 40, fontSize: 20 }}
          onSearch={(value) => { setPhrase(value); setData([]) }}
          placeholder="Search for a movie"
        >
          <Input.Search
            onSearch={() => { setSearched(true); }} size="large" enterButton />
        </AutoComplete> : <></> }
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie name="titanic" />} />

        {home.map((movie) => (
          <Route key={movie.imdbID} path={movie.imdbID} element={<Movie name={movie.Title} />} />
        ))}

        {latest.map((movie) => (
          <Route key={movie.imdbID} path={movie.imdbID} element={<Movie name={movie.Title} />} />
        ))}
        {data.map((movie) => (
          <Route key={movie.imdbID} path={movie.imdbID} element={<Movie name={movie.Title} />} />
        ))}
        <Route path="/" element={<></>} />
        <Route path="/series" element={<></>} />
        <Route path="/search" element={<></>} />
      </Routes>
    </AdamContext.Provider>

  );
}

export default App;
