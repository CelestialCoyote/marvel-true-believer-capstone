import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import "./Statistics.css";


export const data = [
    ["Character Name", "likes", "id"],
    ["Spider-Man", 45, 1009610],
    ["Captain America", 20, 1009220],
    ["Iron Man", 30, 1009368],
    ["Black Panther", 25, 1009187],
    ["Thor", 15, 1009664],
    ["Captain Marvel", 10, 1010338],
    ["Vision", 7, 1009697],
    ["Black Widow", 5, 1009189],
];

export const options = {
    title: "Characters with most 'likes'.",
    pieSliceText: "label",
    sliceVisibilityThreshold: 0.05,
    is3D: true,
};


const Statistics = () => {
    const BASE_CHARACTER_URL = 'http://localhost:3015/api/characters';
    const [characterLikes, setCharacterLikes] = useState(null);

    const characterData = [["Character Name", "likes", "id"]];

    const getCharacterLikes = async () => {
        let likeData = await axios.get(
            `${BASE_CHARACTER_URL}/`
        );

        likeData.data.map(like => {
            characterData.push([
                like.marvelName,
                like.likes,
                like.marvelID
            ]);
        });
        console.log('chart data: ', characterData);
    };

    useEffect(() => {
        getCharacterLikes();
    }, []);

    console.log('characterLikes: ', characterLikes);


    return (
        
        <div className="statistics">

            <Chart
                chartType="PieChart"
                data={characterData}
                options={options}
                width={"100%"}
                height={"100%"}
            />

        </div>
        
    );
};


export default Statistics;
