import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import "./Statistics.css";


//export const data = [
//    ["Character Name", "likes", "id"],
//    ["Spider-Man", 45, 1009610],
//    ["Captain America", 20, 1009220],
//    ["Iron Man", 30, 1009368],
//    ["Black Panther", 25, 1009187],
//    ["Thor", 15, 1009664],
//    ["Captain Marvel", 10, 1010338],
//    ["Vision", 7, 1009697],
//    ["Black Widow", 5, 1009189],
//];

export const options = {
    title: "Characters with most 'likes'.",
    backgroundColor: "#a5a5ab",
    //forceIFrame: true,
    pieSliceText: "label",
    sliceVisibilityThreshold: 0.05,
    is3D: true,
};


const Statistics = () => {
    const BASE_CHARACTER_URL = 'http://localhost:3015/api/characters';
    const [characterLikes, setCharacterLikes] = useState(null);

    const getCharacterLikes = async () => {
        let response = await axios.get(
            `${BASE_CHARACTER_URL}/`
        );
        
        setCharacterLikes(response.data);
    };

    useEffect(() => {
        getCharacterLikes();
    }, []);

    return (
        
        <div className="statistics">

            <Chart
                chartType="PieChart"
                data={characterLikes}
                options={options}
                width={"512px"}
                height={"384px"}
            />

        </div>
        
    );
};


export default Statistics;
