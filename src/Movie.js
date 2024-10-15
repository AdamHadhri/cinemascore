import React, { useEffect, useState, useContext } from 'react';
import { AdamContext } from './App'; 
import Lign from './Lign';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: pink[500],
        },
    },
});

function ActorImage({ actorName }) {
    const [imageUrl, setImageUrl] = useState(null);



    useEffect(() => {
        const fetchActorImage = async () => {
            try {
                // First API call to search for the actor
                const response = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                    params: {
                        action: 'query',
                        format: 'json',
                        list: 'search',
                        srsearch: actorName,
                        origin: '*',
                    },
                });

                const pageId = response.data.query.search[0].pageid;

                const imageResponse = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                    params: {
                        action: 'query',
                        prop: 'pageimages',
                        format: 'json',
                        pageids: pageId,
                        origin: '*',
                    },
                });

                const imageUrl = imageResponse.data.query.pages[pageId].thumbnail?.source;
                if (imageUrl) {
                    setImageUrl(imageUrl);
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (actorName) {
            fetchActorImage();
        }
    }, [actorName]);

    return (
        <div>
            {imageUrl ? (
                <img className='h-[68px] w-[60px] object-cover rounded-[10px]' src={imageUrl} alt={actorName} />
            ) : (
                <img className='h-[68px] w-[60px] object-cover rounded-[10px]' src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" alt="∅" />
            )}
        </div>
    );
}

function Movie({ name }) {
    const {  setSearching } = useContext(AdamContext);

    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSearching(false);
      }, [setSearching]);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axios.get(`https://www.omdbapi.com/?t=${name}&apikey=e6432a8d`);
                setInfo(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (name) {
            fetchInfo();
        }
    }, [name]);

    const GenreList = ({ genres = '' }) => {
        const genresArray = genres.split(', ');

        return (
            <div className='flex gap-4'>
                {genresArray.map((genre, index) => (
                    <div
                        className='h-[45px] px-4 text-[22px] bg-[#891A45] text-[#ffffff] rounded-full flex justify-center items-center'
                        key={index}
                    >
                        {genre}
                    </div>
                ))}
            </div>
        );
    };

    const ActorList = ({ actors = '' }) => {
        const actorsArray = actors.split(', ');

        return (
            <div className='flex flex-col gap-[30px]'>
                {actorsArray.map((actor, index) => (
                    <div className='h-[50px] mt-4 px-4 text-[24px] flex items-center' key={index}>
                        <ActorImage actorName={actor} />
                        <p className='font-medium m-3'>{actor}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="secondary" />
                    </ThemeProvider>
                </Box>
            ) : (
                <div className='px-[70px]'>
                    <div className='h-[150px] flex'>
                        <div className='w-[60%] pl-5 flex flex-col justify-center'>
                            <p className='text-[35px] text-[#5B0F2A] font-bold'>{info?.Title}</p>
                            <p className='text-[25px] text-[#D96973] font-medium'>({info?.Released})</p>
                        </div>
                        <div className='flex gap-6 w-[40%] pt-7 pr-4'>
                            <div style={{
                                backgroundColor:
                                    info?.Metascore >= 65 ? "var(--good)" :
                                    info?.Metascore >= 50 ? "var(--mid)": 
                                    info?.Metascore < 50 ? "var(--bad)" :
                                    "#FF737F"
                            }} className='w-1/3 outline-[3px] outline outline-[#D9C6B9] rounded-[12px] justify-center flex flex-col gap-2 items-center'>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Metacritic_logo.svg" alt="Metacritic" />
                                <p className='font-semibold leading-9 text-[#ffffff] text-[36px]'>{info?.Metascore!=="N/A" ? info?.Metascore+"/100" : "Not found" }</p>
                            </div>
                            <div style={{
                                backgroundColor:
                                    info?.Ratings?.[1]?.Value.slice(0, -1) >= 65 ? "var(--good)" :
                                        info?.Ratings?.[1]?.Value.slice(0, -1) >= 50 ? "var(--mid)" :
                                        info?.Ratings?.[1]?.Value.slice(0, -1) < 50 ? "var(--bad)" :
                                            "#FF737F"
                            }} className='w-1/3 outline-[3px] outline outline-[#D9C6B9] rounded-[12px] bg-good justify-center flex flex-col gap-2 items-center'>
                                <img className='h-[50px]' src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Rotten_Tomatoes_logo.svg" alt="Rotten Tomatoes" />
                                <p className='font-semibold leading-9 text-[#fefefe] text-[36px]'>{info?.Ratings?.[1]?.Value || 'Not found'}</p>
                            </div>
                            <div style={{
                                backgroundColor:
                                    info?.imdbRating >= 6.5 ? "var(--good)" :
                                    info?.imdbRating >= 5 ? "var(--mid)" :
                                    info?.imdbRating < 5 ? "var(--bad)" :
                                    "#FF737F"
                            }} className='w-1/3 outline-[3px] outline outline-[#D9C6B9] rounded-[12px] bg-good justify-center flex flex-col gap-2 items-center'>
                                <img className='h-[50px]' src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDB" />
                                <p className='font-semibold leading-9 text-[#ffffff] text-[36px]'>{info?.imdbRating || 'Not found'}/10</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex h-[650px]'>
                        <img src={info?.Poster} className='h-[650px] w-[450px] object-cover rounded-[30px]' alt={info?.Title} />

                        <div className='pt-5 h-[680px] w-[50%]'>
                            <div className='flex ml-10 items-center'>
                                <p className='text-[24px] font-medium mr-3'>Genre:</p>
                                <GenreList genres={info?.Genre} />
                            </div>
                            <Lign name="Runtime" content={`${Math.floor(parseInt(info?.Runtime) / 60)} hrs ${parseInt(info?.Runtime) % 60} min`} />
                            <Lign name="Country" content={info?.Country} />
                            <Lign name="Languages" content={info?.Language} />
                            <Lign name="Awards" content={info?.Awards} />
                            <Lign name="Director" content={info?.Director} />
                            <Lign name="Writer" content={info?.Writer} line={false} />
                        </div>

                        <div className='h-[680px] w-[25%]'>
                            <div className='flex bg-[#FFCAA9] border-[#611942] flex-col mt-8 m-4 overflow-auto px-4 py-3 h-[280px] rounded-[10px] border-[3px]'>
                                <p className='text-[26px] text-[#611942] font-semibold'>Plot:</p>
                                <p className='text-[24px]'>{info?.Plot}</p>
                            </div>
                            <div>
                                <p className='text-[26px] text-[#611942] m-4 font-semibold'>Actors:</p>
                                <ActorList actors={info?.Actors} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movie;
