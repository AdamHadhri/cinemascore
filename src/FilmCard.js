import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './index.css';
import './App.css';

function FilmCard({ d, rating }) {
    return (
        <div
            style={{
                backgroundColor:
                    rating >= 6.5 ? "var(--good)" :
                        rating >= 5 ? "var(--mid)" :
                            "var(--bad)"
            }}
            className="flex rounded-[20px] flex-col items-center py-3 w-[224px]"
        >
            <Card sx={{ height: '250px', width: '200px', position: 'relative', borderRadius: 3 }}>
                <div style={{height: 70, width: 70,  position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    <CircularProgressbar strokeWidth={10}
                        value={rating * 10}
                        text={`${rating}`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            textColor: "#fff",
                            pathColor: rating >= 6.5 ? "var(--good)" : rating >= 5 ? "var(--mid)" : "var(--bad)",
                            trailColor: "white",
                            textSize: '30px',
                        })}
                    />
                </div>

                <CardMedia 
                    component="img"
                    sx={{ height: '300px', width: '250px', zIndex: 5, borderRadius: '8px', position: 'relative' }}
                    image={d.Poster !== 'N/A' && d.Poster ? d.Poster : 'https://tinyurl.com/3jbs2b8k'}
                    alt={d.Title}
                />
            </Card>
            <div className="px-4 pt-2 text-white w-full">
                <p className="font-bold text-white text-[17px]">
                    {d.Title.length <= 20 ? d.Title : d.Title.slice(0,18) + "..."}
                </p>
                <p className="font-semibold text-neutral-500 text-[15px]">{d.Year}</p>
            </div>
        </div>
    );
}

export default FilmCard;
